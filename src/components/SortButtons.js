import React from 'react';

import './SortButtons.css';

export function SortButtons(props) {

  const unsortedButton = () => {
    if (props.wayOfSorting === "unsorted") {
      return <button onClick={handleClick} type="button" data-sorting="unsorted-reversed" className="sort-button">
        Unsorted <img className="sort_icon" alt="from last to first generated" src="001-sort-by-order.svg" width="15" height="15"/>
      </button>;
    }
    else {
      return <button onClick={handleClick} type="button" data-sorting="unsorted" className="sort-button">
        Unsorted <img className="sort_icon" alt="from first to last generated" src="002-sort-by-numeric-order.svg" width="15" height="15"/>
      </button>;
    }
  };

  const alphabeticallyButton = () => {
    if (props.wayOfSorting === "alphabetically") {
      return <button onClick={handleClick} type="button" data-sorting="alphabetically-reversed" className="sort-button">
        Alphabetically <img className="sort_icon" alt="from Z to A" src="003-sort-reverse-alphabetical-order.svg" width="15" height="15"/>
      </button>;
    }
    else {
      return <button onClick={handleClick} type="button" data-sorting="alphabetically" className="sort-button">
        Alphabetically <img className="sort_icon" alt="from A to Z" src="006-sort-by-alphabet.svg" width="15" height="15"/>
      </button>;
    }
  };

  const lengthButton = () => {
    if (props.wayOfSorting === "length") {
      return <button onClick={handleClick} type="button" data-sorting="length-reversed" className="sort-button">
        By name length <img className="sort_icon" alt="from longest to shortest" src="004-sort-by-attributes.svg" width="15" height="15"/>
      </button>;
    }
    else {
      return <button onClick={handleClick} type="button" data-sorting="length" className="sort-button">
        By name length <img className="sort_icon" alt="from shortest to longest" src="005-sort-by-attributes-interface-button-option.svg" width="15" height="15"/>
      </button>;
    }

  };

  const currentSorting = () => {
    switch (props.wayOfSorting) {
      case "unsorted":
        return <span>Unsorted <img className="sort_icon" alt="from first to last generated" src="002-sort-by-numeric-order.svg" width="18" height="18"/></span>;
        break;
      case "unsorted-reversed":
        return <span>Unsorted <img className="sort_icon" alt="from last to first generated" src="001-sort-by-order.svg" width="18" height="18"/></span>;
        break;
      case "alphabetically":
        return <span>Alphabetically <img className="sort_icon" alt="from A to Z" src="006-sort-by-alphabet.svg" width="18" height="18"/></span>;
        break;
      case "alphabetically-reversed":
        return <span>Alphabetically <img className="sort_icon" alt="from Z to A" src="003-sort-reverse-alphabetical-order.svg" width="18" height="18"/></span>;
        break;
      case "length":
        return <span>By name length <img className="sort_icon" alt="from shortest to longest" src="005-sort-by-attributes-interface-button-option.svg" width="18" height="18"/></span>;
        break;
      case "length-reversed":
        return <span>By name length <img className="sort_icon" alt="from longest to shortest" src="004-sort-by-attributes.svg" width="18" height="18"/></span>;
        break;
      default:
    }
  }

  const handleClick = (e) => {
    props.setSortMethod(e.target.dataset.sorting);
  }

  return (
    <div>
      <h2 className="subsection-header">Current sorting: ({currentSorting()})</h2>
      <div className="sort-buttons">
        {unsortedButton()}
        {alphabeticallyButton()}
        {lengthButton()}
      </div>
    </div>
  );
}
