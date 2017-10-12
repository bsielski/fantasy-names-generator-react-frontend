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

    const sortedGenerated = this.props.generated.slice();

    if (this.props.wayOfSorting === "unsorted-reversed") {
      sortedGenerated.reverse();
    }
    else if (this.props.wayOfSorting === "alphabetically") {
      sortedGenerated.sort((a,b) => {
        if (a < b) return -1; else return 1
      })
    }
    else if (this.props.wayOfSorting === "alphabetically-reversed") {
      sortedGenerated.sort((a,b) => {
        if (a > b) return -1; else return 1
      })
    }
    else if (this.props.wayOfSorting === "length") {
      sortedGenerated.sort((a,b) => {
        if (a.length < b.length) return -1; else return 1
      })
    }
    else if (this.props.wayOfSorting === "length-reversed") {
      sortedGenerated.sort((a,b) => {
        if (a.length > b.length) return -1; else return 1
      })
    }

    const generatedList = sortedGenerated.map( (name, index) => {
      return (
        <li key={index}>{name}</li>
      );
    });

    return (
      <div>
        <br />
        <h2 className="subsection-header">Names from namestes (debugging)</h2>
        <ol className="list-of-generated">
          {fetchedList}
        </ol>
        <h2 className="subsection-header">Generated names</h2>
        <ol className="list-of-generated" id="list-of-generated">
          {generatedList}
        </ol>
      </div>
    );

  }

}
