import React from 'react';


// import './GeneratedContainer.css';

export class GeneratedItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
}

  render() {
    const items = this.props.items.map( (name, index) => {
      return (
        <li key={index}>{name}</li>
      );
    });

    return (
      <div>
        <br />
        <h2 className="subsection-header">Generated names</h2>
        <ol className="list-of-generated" id="list-of-generated">
          {items}
        </ol>
      </div>
    );

  }

}
