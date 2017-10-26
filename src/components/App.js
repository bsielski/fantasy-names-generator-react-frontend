import React from 'react';
import {RadioGroup} from './RadioGroup';
import {GroupboxContainer} from './GroupboxContainer';
import {ActionButton} from './ActionButton';
import {SortButtons} from './SortButtons';
import {GeneratedContainer} from './GeneratedContainer';

import {Generator} from '../generator';
import {Splitter} from '../splitter';
import {VOWELS} from '../helpers';
// import {CONSONANTS} from '../helpers';
import {RepeatedLettersFilter} from '../filter';
import {ConsonantsPatternsFilter} from '../filter';
import {VowelsPatternsFilter} from '../filter';
import {UniquenessFilter} from '../filter';
import {NameLengthFilter} from '../filter';
import {CapitalizeFilter} from '../filter';

// import {ActionButton} from './ActionButton';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      subgroups: [],
      namesets: [],
      actionButtonText: 'placeholder',
      selectedNamesets: new Set(),
      selectedNumberOption: 0,
      fetchedNames: [],
      generated: [],
      isGenerating: false,
      wayOfSorting: "unsorted",
      defaultCustomNames: {},
    };
    this.numberOptions = [
      {value: 10, label: '10', description: "(I feel very lucky).",},
      {value: 100, label: '100', description: "",},
      {value: 500, label: '500', description: "",},
      {value: 10000, label: '10000', description: "",},
    ];
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.setHowManyNames = this.setHowManyNames.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.setSortMethod = this.setSortMethod.bind(this);
  }

  setSortMethod(method) {
    this.setState(
      { wayOfSorting: method },
    );
  }

  handleAction(e) {
    e.preventDefault();
    this.setState(
      { isGenerating: true },
    );
    console.log("CLICKED");
    const fetched = [];
    let counter = 0;
    const fetchEverything = (ids) => {
      fetch(`http://localhost:3001/api/v1/namesets/${ids[counter]}?include=names`)
      .then(response => response.json())
      .then(response => {
        if (response.included) {
          fetched.push([response.data, response.included]);
        }
        counter ++;
        if (counter < ids.length) {
          fetchEverything(ids);
        } else {
          this.setState(
            { fetchedNames: fetched },
            // her handle custom names
            this.generate
          );
        }
      })
      .catch(error => console.log(error));
    };
    fetchEverything(Array.from(this.state.selectedNamesets));
  }

  generate() {

    const namesetsForGenerator = [];
    const splitterAfter = new Splitter(VOWELS, true, "after")
    const splitterBefore = new Splitter(VOWELS, true, "before")
    const standardFilters = [
      RepeatedLettersFilter,
      ConsonantsPatternsFilter,
      VowelsPatternsFilter,
      UniquenessFilter,
      NameLengthFilter,
      CapitalizeFilter,
    ]

    this.state.fetchedNames.forEach(nameset => {
        const namesetForGenerator = {
          label: nameset[0].attributes.label,
          names: [],
          splitters: [splitterAfter, splitterBefore],
          filters: standardFilters,
        }
        nameset[1].forEach(name => {
            namesetForGenerator.names.push(name.attributes.variants);
        });
        namesetsForGenerator.push(namesetForGenerator);
    });

    if (namesetsForGenerator.length > 0) {
      const generator = new Generator(namesetsForGenerator)
      this.setState(
        {generated: generator.generate(this.numberOptions[this.state.selectedNumberOption].value)},
        () => {this.setState( { isGenerating: false } );}
      );
    }

  }

  setHowManyNames(option) {
    this.setState(
      { selectedNumberOption: option }
    );
  }

  toggleCheckbox(id) {
    if (this.state.selectedNamesets.has(id)) {
      this.setState(previousState => {
        previousState.selectedNamesets.delete(id);
        return { selectedNamesets: previousState.selectedNamesets };
      });
    } else {
      this.setState(previousState => {
        return { selectedNamesets: previousState.selectedNamesets.add(id) };
      });
    }
  }

  componentDidMount() {
    const filterCustomGroupsID = (groups) => {
      const ids = [];
      groups.forEach(group => {
        if (group.attributes.custom == true) {
          ids.push(group.id);
        }
      });
      return ids;
    }

    const filterCustomSubgroupsID = (subgroups, groupIds) => {
      const ids = [];
      subgroups.forEach(subgroup => {
        if (groupIds.includes(subgroup.attributes["group-id"].toString()) == true) {
          ids.push(subgroup.id);
        }
      });
      return ids;
    }

    const filterCustomNamesetsID = (namesets, subgroupIds) => {
      const ids = [];
      namesets.forEach(nameset => {
        if (subgroupIds.includes(nameset.attributes["subgroup-id"].toString()) == true) {
          ids.push(nameset.id);
        }
      });
      return ids;
    }

    fetch('http://localhost:3001/api/v1/groups?include=subgroups')
    .then(response => response.json())
    .then(response => {
      this.setState(
        {groups: response.data, subgroups: response.included},
        () => {
          fetch('http://localhost:3001/api/v1/namesets')
          .then(response => response.json())
          .then(response => {
            this.setState(
              {namesets: response.data},
              () => {
                const customGroupIds = filterCustomGroupsID(this.state.groups);
                const customSubgroupIds = filterCustomSubgroupsID(this.state.subgroups, customGroupIds);
                const customNamesetIds = filterCustomNamesetsID(this.state.namesets, customSubgroupIds);
                // console.log("CUSTOM NAMESET IDS: ", customNamesetIds);

                const customNames = {};
                customNamesetIds.forEach(id => {
                  customNames[id.toString()] = [];
                });
                // console.log("CUSTOM NAMES OBJECT: ", customNames);

                // console.log("GET REQUEST FUUUUCKKK: ", 'http://localhost:3001/api/v1/names?filter' + "[nameset-id]=" + customNamesetIds.toString());
                fetch('http://localhost:3001/api/v1/names?filter' + "[nameset-id]=" + customNamesetIds.toString())
                .then(response => {console.log("RESPONSE: ", response); return response.json();})
                .then(response => {
                  console.log("RESPONSEEEEEE: ", response.data);

                  response.data.forEach(name => {
                    // console.log("CUSTOM NAMESSS: ", customNames);
                    // console.log("FUCKING TYPEEEE: ", name.attributes["nameset-id"], "is fucking", typeof name.attributes["nameset-id"]);
                    // console.log("FUCKING TYPEEE of FUCK: ", typeof customNames[name.attributes["nameset-id"].toString()]);
                    // console.log("IS FUCK AN ARRAY? ", Array.isArray(customNames[name.attributes["nameset-id"]]));
                    customNames[name.attributes["nameset-id"]].push(name);
                  });
                  console.log("CUSTOM NAMESSS: ", customNames);
                  this.setState(
                    {defaultCustomNames: customNames},
                  );
                })
                .catch(error => console.log(error));

              }
            );
          })
          .catch(error => console.log(error));

        }
      );

    })
    .catch(error => console.log(error));

  }

  render() {
    return (
      <main className="l-main-container">
        <section className="l-section-container l-section-container--input">
          <div>
            <RadioGroup
              options={this.numberOptions}
              selectedOption={this.state.selectedNumberOption}
              setHowManyNames={this.setHowManyNames}
            />
            <GroupboxContainer
              groups={this.state.groups}
              subgroups={this.state.subgroups}
              namesets={this.state.namesets}
              handleCheckboxChange={this.toggleCheckbox}
              defaultCustomNames={this.state.defaultCustomNames}
            />
            <ActionButton
              isGenerating={this.state.isGenerating}
              howManyNamesetsSelected={this.state.selectedNamesets.size}
              howManyNames={this.numberOptions[this.state.selectedNumberOption].value}
              onClick={this.handleAction}
            />
            {/* <DebugInfo namesets={this.state.selectedNamesets} /> */}
          </div>
        </section>

        <section className="l-section-container l-section-container--output">
        	<div>
            <SortButtons setSortMethod={this.setSortMethod} wayOfSorting={this.state.wayOfSorting} />
            <GeneratedContainer fetched={this.state.fetchedNames} generated={this.state.generated} wayOfSorting={this.state.wayOfSorting} />
        	</div>
        </section>
      </main>
    );
  }
}

// function DebugInfo(props) {
//   console.log("WTF IS SELECTED NAMESET");
//   console.log(props.namesets);
//   const buildNamesets = (id, index) => {
//     return (
//       <p key={index}>{id}</p>
//     );
//   }
//
//   const namesets = Array.from(props.namesets).map(buildNamesets)
//
//   return (
//     <div>
//       debug<br />
//       {namesets}
//     </div>
//   );
// }
