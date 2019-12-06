import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditEvent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.mountEventEditForm(this.props.eventId);
  }

  render() {

    return (
      <>
        <div id="edit-event-div">
          <h3>Edit Your Event</h3>
        </div>
        <form id="edit-event-form" onSubmit={this.props.handleSubmit}>

          <p>Event's name:</p>
          <input
            type="text"
            name="name"
            value={this.props.eventForm.name}
            onChange={this.props.handleEventFormChange} />

          <p>Event's Bio:</p>
          <input
            type="text"
            name="event_type"
            value={this.props.eventForm.event_type}
            onChange={this.props.handleEventFormChange} />

          <p>Birth Date:</p>
          <input
            type="date"
            name="event_date"
            value={this.props.eventForm.event_date}
            onChange={this.props.handleEventFormChange} />

          <p>Birth Date:</p>
          <input
            type="date"
            name="expiration_date"
            value={this.props.eventForm.expiration_date}
            onChange={this.props.handleEventFormChange} />
          <br />

          <button className="submit-button">Submit</button>
        </form>
      </>
    )
  }
}

export default withRouter(EditEvent);
