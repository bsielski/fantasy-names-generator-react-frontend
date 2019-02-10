import React from 'react';

import './Footer.css';

export class Footer extends React.Component {

    render() {
	return (
	    <footer className="l-footer-container">
	      Created in 2017 by Bartłomiej Sielski
	      <br />
	      for education, worldbuilding and fun.
	      <br />
	      <br />
	      Sorting icons made by
	      <a className="credit_link" href="https://www.flaticon.com/authors/dave-gandy" target="blank">
	        Dave Gandy
	      </a>
	    </footer>
	);
    }
}
