import React from 'react';

import './SortButtons.css';

export function SortButtons(props) {

  const unsortedButton = () => {
    if (props.wayOfSorting === "unsorted") {
      return <button onClick={handleClick} type="button" data-sorting="unsorted-reversed" className="sort-button">Unsorted reversed</button>;
    }
    else {
      return <button onClick={handleClick} type="button" data-sorting="unsorted" className="sort-button">Unsorted</button>;
    }
  };

  const alphabeticallyButton = () => {
    if (props.wayOfSorting === "alphabetically") {
      return <button onClick={handleClick} type="button" data-sorting="alphabetically-reversed" className="sort-button">Alphabetically reversed</button>;
    }
    else {
      return <button onClick={handleClick} type="button" data-sorting="alphabetically" className="sort-button">Alphabetically</button>;
    }
  };

  const lengthButton = () => {
    if (props.wayOfSorting === "length") {
      return <button onClick={handleClick} type="button" data-sorting="length-reversed" className="sort-button">By length reversed</button>;
    }
    else {
      return <button onClick={handleClick} type="button" data-sorting="length" className="sort-button">By length</button>;
    }

  };

  const handleClick = (e) => {
    props.setSortMethod(e.target.dataset.sorting);
  }

  return (
    <div>
      <h2 className="subsection-header">Sorting ({props.wayOfSorting})</h2>
      <div className="sort-buttons">
        {unsortedButton()}
        {alphabeticallyButton()}
        {lengthButton()}
      </div>
    </div>
  );
}
