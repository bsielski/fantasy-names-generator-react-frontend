export function fetchNamesets(urls) {
    return urls.map(url => {
	return fetch(url)
	    .then(response => response.json())
	    .then(response => {
		return [response.data, response.included];
	    })
	    .catch(error => console.log(error))	    
    });
}
