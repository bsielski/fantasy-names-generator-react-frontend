import React from 'react';

// import './Groupbox.css';

export class Nameset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange() {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    this.props.handleCheckboxChange(this.props.nameset.id);
  }

  render() {
    const namesetId = "nameset-" + this.props.nameset.id.toString()
    const namesCount = () => {
      if (this.props.nameset.attributes["names-count"]) {
        return this.props.nameset.attributes["names-count"].toString();
      }
      else {
        return "0";
      }
    }
    return (
      <div className="group-box__item">
        <input className="group-box__checkbox" id={namesetId} type="checkbox"
          onChange={this.handleChange} checked={this.state.isChecked}
        />
        <label className="group-box__label" htmlFor={namesetId}>{this.props.nameset.attributes.label}
          <span className="group-box__names_number">
            {" (" + namesCount() + ")"}
          </span>
        </label>
      </div>
    )

  }

}
