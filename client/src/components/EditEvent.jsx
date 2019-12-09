import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class EditEvent extends Component {

  componentDidMount() {
    this.props.mountEventEditForm(this.props.eventId);
  }

  render() {
    const { pet } = this.props;

    const linear_gradient = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4))`

    return (
      <>
        <div className="sidenav">
          <Link to={`/pets/${pet.id}`}>
            <button>Pet Profile</button>
          </Link>
          <Link to={`/pets/${pet.id}/events`}>
            <button>Medical Log</button>
          </Link>

          {/* <a href="#service-provider-section">Service Providers</a> */}
        </div>

        <div id="edit-event-section"
          style={{ backgroundImage: `${linear_gradient}, url(${pet.image_url})` }}
        >

          <h2>Edit Your Event</h2>
          <form id="edit-event-form" onSubmit={this.props.handleSubmit}>

            <div id="edit-event-form-fields">

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
            </div>

            <button className="submit-button">Submit</button>
          </form>
        </div>
      </>
    )
  }
}

export default withRouter(EditEvent);
