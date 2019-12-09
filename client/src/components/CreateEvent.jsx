import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


function CreateEvent(props) {
  const { pet } = props;
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

      <div id="create-event-form"
        style={{
          backgroundImage: `${linear_gradient}, url(${pet.image_url}) `
        }}
      >

        <h2>Create a new event</h2>
        <form onSubmit={props.newEvent}>
          <p>Event name:</p>
          <input
            type="text"
            name="name"
            value={props.eventForm.name}
            onChange={props.handleEventFormChange} />

          <p>Event Type:</p>
          <input
            type="text"
            name="event_type"
            value={props.eventForm.event_type}
            onChange={props.handleEventFormChange} />

          <p>Event Date:</p>
          <input
            type="date"
            name="event_date"
            value={props.eventForm.event_date}
            onChange={props.handleEventFormChange} />

          <p>Exipiration Date:</p>
          <input
            type="date"
            name="expiration_date"
            value={props.eventForm.expiration_date}
            onChange={props.handleEventFormChange} />

          <br />

          <button className="submit-button">Submit</button>
        </form>
      </div >
    </>
  )
}

export default withRouter(CreateEvent);
