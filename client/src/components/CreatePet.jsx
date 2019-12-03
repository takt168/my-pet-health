import React from 'react';
import { withRouter } from 'react-router-dom';

function CreatePet(props) {
  return (
    <div className="create-form" >
      <h2>Create a new pet</h2>
      <form onSubmit={props.newPet}>
        <p>Photo Link:</p>
        <input
          type="text"
          name="image_url"
          value={props.petForm.image_url}
          onChange={props.handleFormChange} />
        <p>Pet's name:</p>
        <input
          type="text"
          name="name"
          value={props.petForm.name}
          onChange={props.handleFormChange} />
        <button>Submit</button>
      </form>
    </div >
  )
}

export default withRouter(CreatePet);
