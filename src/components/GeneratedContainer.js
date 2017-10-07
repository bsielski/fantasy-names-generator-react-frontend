import React from 'react';

// import './GeneratedContainer.css';

export class GeneratedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let counter = 0;
    const list = [];

    this.props.fetched.forEach(nameset => {
        nameset[1].forEach(name => {
            list.push(<li key={counter}>{nameset[0].attributes.label} - {name.attributes.variants}</li>);
            counter++;
        });
    });

    return (
      <div>
        <h2 className="subsection-header">Generated names</h2>
        <ol className="list-of-generated" id="list-of-generated">
          {list}
          {/* {generated} */}
        </ol>
      </div>
    );

  }

}
