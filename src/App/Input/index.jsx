import React from 'react';

import {GroupboxContainer} from './GroupboxContainer';

import './styles.css';

function Input (props) {

	  return (
		    <section className="input">
		      <GroupboxContainer
		        afterToggleNamesetCheckbox={props.afterToggleNamesetCheckbox}
		        afterToggleCustomNamesetCheckbox={props.afterToggleCustomNamesetCheckbox}
            afterChangeCustomNamesetTextArea={props.afterChangeCustomNamesetTextArea}
            fetchGroupsSubgroupsNamesets={props.fetchGroupsSubgroupsNamesets}
            customNamesetsForGenerator={props.customNamesetsForGenerator}
		      />
		    </section>
	  );

}

export default Input;
