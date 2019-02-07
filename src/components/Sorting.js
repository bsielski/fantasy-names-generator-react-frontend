import React from 'react';
import {SortButton} from './SortButton';

import './Sorting.css';

export class Sorting extends React.Component {

    render() {
	const sortButton = (sortingButton, names, afterSorting) => {
	    return (
		<SortButton
		  key={sortingButton.id}
		  sortingButton={sortingButton}
		  afterSorting={afterSorting}
		  names={names}
		  />
	    );
	};

	const sortButtons = this.props.sortingButtons.map(sortingButton =>{
	    return sortButton(sortingButton, this.props.generated, this.props.afterSorting);
	});
	
	return (
	    <section className="sorting">
              <h2 className="subsection-header">Sorting methods</h2>
              <div className="sort-buttons">
		{sortButtons}
              </div>
	    </section>
	)
    }

}
