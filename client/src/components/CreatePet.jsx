import React from 'react';
import { withRouter } from 'react-router-dom';

function CreatePet(props) {
  return (
    <div className="create-form" >
      <h2>Add a new pet</h2>
      <form onSubmit={props.newPet}>
        <p>Pet's name:</p>
        <input
          type="text"
          name="name"
          value={props.petForm.name}
          onChange={props.handleFormChange} />

        <p>Pet's Bio:</p>
        <textarea rows="5" cols="75"
          name="description"
          value={props.petForm.description}
          onChange={props.handleFormChange} >
        </textarea>

        <p>Species:</p>
        <input
          type="text"
          name="species"
          value={props.petForm.species}
          onChange={props.handleFormChange} />

        <p>Breed:</p>
        <input
          type="text"
          name="breed"
          value={props.petForm.breed}
          onChange={props.handleFormChange} />

        <p>Birth Date:</p>
        <input
          type="date"
          name="birth_date"
          value={props.petForm.birth_date}
          onChange={props.handleFormChange} />

        <p>Photo Link:</p>
        <input
          type="text"
          name="image_url"
          value={props.petForm.image_url}
          onChange={props.handleFormChange} />

        <br />

        <button className="submit-button">Submit</button>
      </form>
    </div >
  )
}

export default withRouter(CreatePet);
