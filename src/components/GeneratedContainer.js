import React from 'react';


// import './GeneratedContainer.css';

export class GeneratedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let counter = 0;
    const fetchedList = [];

    this.props.fetched.forEach(nameset => {
        nameset[1].forEach(name => {
            fetchedList.push(<li key={counter}>{nameset[0].attributes.label} - {name.attributes.variants}</li>);
            counter++;
        });
    });

    const generatedList = this.props.generated.map( (name, index) => {
      return (
        <li key={index}>{name}</li>
      );
    });

    return (
      <div>
        <h2 className="subsection-header">Generated names</h2>
        <ol className="list-of-generated" id="list-of-generated">
          {fetchedList}
          {generatedList}
        </ol>
      </div>
    );

  }

}
