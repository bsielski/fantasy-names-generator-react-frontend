import React from 'react';
import {SortButton} from './SortButton';

import './Sorting.css';

export function Sorting(props) {

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

    const sortButtons = props.sortingOptions.map(sortingButton =>{
	return sortButton(sortingButton, props.generated, props.afterSorting);
    });
    
    return (
	<section className="sorting">
          <h2 className="subsection-header">Sorting methods</h2>
          <div className="sort-buttons">
	    {sortButtons}
          </div>
	</section>
    );
}
