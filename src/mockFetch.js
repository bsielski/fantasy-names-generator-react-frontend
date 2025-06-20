import groupsData from './data/groups.json';
import subgroupsData from './data/subgroups.json';
import namesetsData from './data/namesets.json';
import namesData from './data/names.json';

const convertKeysToKebabCase = (obj) => {
  if (!obj) return {};
  const newObj = {};
  for (const key in obj) {
    const newKey = key.replace(/_/g, '-');
    newObj[newKey] = obj[key];
  }
  return newObj;
};

const transformToJsonApi = (item, type) => {
  const { id, ...attributes } = item;
  return {
    id: String(id),
    type: type,
    attributes: convertKeysToKebabCase(attributes),
  };
};

const resourceHandlers = {
  groups: {
    all: () => groupsData,
    findById: (id) => groupsData.find(g => g.id === id),
    buildRelationships: (group) => ({
      subgroups: { data: subgroupsData.filter(sg => sg.group_id === group.id).map(sg => ({ type: 'subgroups', id: String(sg.id) })) },
    }),
  },
  subgroups: {
    all: () => subgroupsData,
    findById: (id) => subgroupsData.find(sg => sg.id === id),
    buildRelationships: (subgroup) => ({
      namesets: { data: namesetsData.filter(ns => ns.subgroup_id === subgroup.id).map(ns => ({ type: 'namesets', id: String(ns.id) })) },
    }),
  },
  namesets: {
    all: () => namesetsData,
    findById: (id) => namesetsData.find(ns => ns.id === id),
    buildRelationships: (nameset) => ({
      names: { data: namesData.filter(n => n.nameset_id === nameset.id).map(n => ({ type: 'names', id: String(n.id) })) },
    }),
  },
  names: {
    all: () => namesData,
    findById: (id) => namesData.find(n => n.id === id),
    buildRelationships: () => ({}),
  },
};

const nestedRelations = {
  namesets: {
    names: (parentId) => namesData.filter(n => n.nameset_id === parentId)
  }
};

/**
 * Fałszywa implementacja fetch, która obsługuje oba typy URLi ze starego API.
 * @param {string} url - URL, który byłby wysyłany do prawdziwego API.
 * @returns {Promise} - Promise, które resolvuje do obiektu z metodą .json(), naśladując fetch.
 */
export const mockFetch = (url) => {
  const urlObject = new URL(url);
  const path = urlObject.pathname;
  const includeParams = urlObject.searchParams.get('include');

  const relatedCollectionMatch = path.match(/\/api\/v1\/(\w+)\/(\d+)\/(\w+)\/?$/);
  
  const singleResourceMatch = path.match(/\/api\/v1\/(\w+)\/(\d+)\/?$/);
  
  const collectionMatch = path.match(/\/api\/v1\/(\w+)\/?$/);

  let response = { data: null, included: [] };

  if (relatedCollectionMatch) {
    const parentType = relatedCollectionMatch[1]; // "namesets"
    const parentId = parseInt(relatedCollectionMatch[2], 10); // 28
    const relationType = relatedCollectionMatch[3]; // "names"

    if (nestedRelations[parentType] && nestedRelations[parentType][relationType]) {
      const relatedData = nestedRelations[parentType][relationType](parentId);
      // Stare API w tym przypadku zwracało listę imion bezpośrednio w `data`
      response.data = relatedData.map(item => transformToJsonApi(item, relationType));
    }
  } else if (singleResourceMatch) {
    const resourceType = singleResourceMatch[1];
    const resourceId = parseInt(singleResourceMatch[2], 10);
    const handler = resourceHandlers[resourceType];

    if (handler) {
      const resource = handler.findById(resourceId);
      if (resource) {
        response.data = transformToJsonApi(resource, resourceType);
        response.data.relationships = handler.buildRelationships(resource);

        if (includeParams === 'names' && resourceType === 'namesets') {
          const relatedNames = namesData.filter(n => n.nameset_id === resourceId);
          response.included = relatedNames.map(n => transformToJsonApi(n, 'names'));
        }
      }
    }
  } else if (collectionMatch) {
    const resourceType = collectionMatch[1];
    const handler = resourceHandlers[resourceType];
    
    if (handler) {
      response.data = handler.all().map(item => {
        const jsonApiItem = transformToJsonApi(item, resourceType);
        jsonApiItem.relationships = handler.buildRelationships(item);
        return jsonApiItem;
      });

      if (includeParams === 'subgroups.namesets' && resourceType === 'groups') {
        const allSubgroups = subgroupsData.map(sg => {
          const jsonApiItem = transformToJsonApi(sg, 'subgroups');
          jsonApiItem.relationships = resourceHandlers.subgroups.buildRelationships(sg);
          return jsonApiItem;
        });
        const allNamesets = namesetsData.map(ns => {
          const jsonApiItem = transformToJsonApi(ns, 'namesets');
          return jsonApiItem;
        });
        response.included = [...allSubgroups, ...allNamesets];
      }
    }
  }

  return Promise.resolve({
    json: () => Promise.resolve(response),
  });
};