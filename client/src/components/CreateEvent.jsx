import React from 'react';
import { withRouter } from 'react-router-dom';


function CreateEvent(props) {
  return (
    <div className="create-event-form" >

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
  )
}

export default withRouter(CreateEvent);
