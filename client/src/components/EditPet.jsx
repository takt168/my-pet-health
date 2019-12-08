import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class EditPet extends Component {

  render() {

    const { pet, petForm } = this.props;
    const linear_gradient = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4))`

    return (
      <>
        <div className="sidenav">
          <Link to={`/pets/${petForm.id}`}>
            <button>Pet Profile</button>
          </Link>
          {this.props.currentUser &&
            <Link to={`/pets/${petForm.id}`}>
              <button>Medical Log</button>
            </Link>
          }
          {/* <a href="#service-provider-section">Service Providers</a> */}
        </div>

        <div id="edit-pet-section"
          style={{
            backgroundImage: `${linear_gradient}, url(${pet.image_url}) `
          }}
        >
          <div className="edit-pet-div">
            <h3>Edit Your Pet's Profile</h3>
          </div>
          <form onSubmit={this.props.editPet}>
            <div className="edit-pet-div">

              <div className="in-line-edit">
                <p>Pet's name:</p>
                <input
                  type="text"
                  name="name"
                  value={petForm.name}
                  onChange={this.props.handleFormChange} />
              </div>
            </div>
            <br />

            <div className="edit-pet-div">

              <div className="in-line-edit">
                <p>Pet's Bio:</p>
                <textarea rows="5" cols="75" name="description"
                  value={petForm.description}
                  onChange={this.props.handleFormChange}>
                </textarea>
              </div>
            </div>
            <br />

            <div className="edit-pet-div">

              <div className="in-line-edit">
                <p>Species:</p>
                <input
                  type="text"
                  name="species"
                  value={petForm.species}
                  onChange={this.props.handleFormChange} />
              </div>
            </div>
            <br />

            <div className="edit-pet-div">

              <div className="in-line-edit">
                <p>Breed:</p>
                <input
                  type="text"
                  name="breed"
                  value={petForm.breed}
                  onChange={this.props.handleFormChange} />
              </div>
            </div>
            <br />

            <div className="edit-pet-div">

              <div className="in-line-edit">
                <p>Birth Date:</p>
                <input
                  type="date"
                  name="birth_date"
                  value={petForm.birth_date}
                  onChange={this.props.handleFormChange} />
              </div>
            </div>
            <br />



            <div className="edit-pet-div">
              <div className="in-line-edit">
                <p>Photo Link:</p>
                <input
                  type="text"
                  name="image_url"
                  value={petForm.image_url}
                  onChange={this.props.handleFormChange} />
              </div>
            </div>
            <br />
            <button className="submit-button">Submit</button>
          </form>
        </div>
      </>
    )
  }
}
export default withRouter(EditPet);
