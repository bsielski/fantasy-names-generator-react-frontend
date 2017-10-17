import React from 'react';

import './CustomGroupbox.css';

export class CustomGroupbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namesets: [],
    };
  }

  render() {

    return (
      <section className="group-box">
        <div className="group-box__header">Custom group</div>
        <div className="group-box__body">

          <div className="group-box__column">
            <div className="group-box__label">Custom nameset 2</div>
            <textarea name="textarea" className="custom_names__text_area"
               rows="10" cols="15">Write something here</textarea>
          </div>

          <div className="group-box__column">
            <div className="group-box__label">Custom nameset 2</div>
            <textarea name="textarea" className="custom_names__text_area"
               rows="10" cols="15">Write something here</textarea>
          </div>

        </div>
      </section>

    )

  }

}
