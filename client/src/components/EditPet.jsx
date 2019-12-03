import React from 'react';
import { withRouter } from 'react-router-dom';

function EditPet(props) {
  return (
    <>
      <div className="edit-pet-div">
        <h3>Edit Your Pet's Profile</h3>
      </div>
      <form onSubmit={props.handleSubmit}>
        <div className="edit-pet-div">

          <div className="in-line-edit">
            <p>Pet's name:</p>
            <input
              type="text"
              name="name"
              value={props.petForm.name}
              onChange={props.handleFormChange} />
          </div>
        </div>
        <br />

        <div className="edit-pet-div">

          <div className="in-line-edit">
            <p>Pet's Bio:</p>
            <input
              type="text"
              name="description"
              value={props.petForm.description}
              onChange={props.handleFormChange} />
          </div>
        </div>
        <br />

        <div className="edit-pet-div">

          <div className="in-line-edit">
            <p>Species:</p>
            <input
              type="text"
              name="species"
              value={props.petForm.species}
              onChange={props.handleFormChange} />
          </div>
        </div>
        <br />

        <div className="edit-pet-div">

          <div className="in-line-edit">
            <p>Breed:</p>
            <input
              type="text"
              name="breed"
              value={props.petForm.breed}
              onChange={props.handleFormChange} />
          </div>
        </div>
        <br />

        <div className="edit-pet-div">

          <div className="in-line-edit">
            <p>Birth Date:</p>
            <input
              type="date"
              name="birth_date"
              value={props.petForm.birth_date}
              onChange={props.handleFormChange} />
          </div>
        </div>
        <br />



        <div className="edit-pet-div">
          <div className="in-line-edit">
            <p>Photo Link:</p>
            <input
              type="text"
              name="image_url"
              value={props.petForm.image_url}
              onChange={props.handleFormChange} />
          </div>
        </div>
        <br />
        <button>Submit</button>
      </form>
    </>
  )
}

export default withRouter(EditPet);
