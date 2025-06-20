import {mockFetch} from './mockFetch';

export function fetchNames(urls) {
    return urls.map(url => {
	return mockFetch(url)
	    .then(response => response.json())
	    .then(response => {
		return [response.data, response.included];
	    })
	    .catch(error => console.log(error))	    
    });
}
