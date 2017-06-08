import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends React.Component {
  render() {
    return (
      //<h1> PSAP </h1>\
      <div className="container-fluid">
        <div className="form-group col-xs-4 col-md-4">
            <label htmlFor="name" className="control-label">Label for text input</label>
            <input type="text" className="form-control" id="name" placeholder=""/>
            <button type="submit" className="btn btn-primary">getChannel</button>
          </div>
      </div>
    );
  }
}

export default EventForm;