import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditEvent extends Component {

  componentDidMount() {
    this.props.mountEventEditForm(this.props.eventId);
  }

  render() {
    const linear_gradient = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4))`

    const background_image = this.props.pet ? this.props.pet.image_url : ""
    return (
      <>

        <div id="edit-event-section" style={{
          backgroundImage: `${linear_gradient}, url(${background_image}) `
        }}>

          <h3>Edit Your Event</h3>
          <form id="edit-event-form" onSubmit={this.props.handleSubmit}>

            <p>Event's name:</p>
            <input
              type="text"
              name="name"
              value={this.props.eventForm.name}
              onChange={this.props.handleEventFormChange} />

            <p>Event Type:</p>
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
        </div>
      </>
    )
  }
}

export default withRouter(EditEvent);
