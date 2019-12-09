import React from 'react';
import { withRouter } from 'react-router';

function PetsView(props) {
  return (
    <div className="pet-container">
      {props.currentUser &&
        <div
          className="pet-add-section"
          onClick={() => {
            props.history.push('/new/pet');
            window.scrollTo(0, 0);
          }}>
          <img
            alt="Create a new pet"
            src="https://image.flaticon.com/icons/png/512/14/14980.png"
            className="plus-sign" />
          <h3>Create a new pet</h3>
        </div>
      }
      {props.pets.map(pet => (
        <div
          key={pet.id}
          className="pet-card"
          onClick={(e) => {
            props.history.push(`/pets/${pet.id}`);
            window.scrollTo(0, 0);
          }}>
          <img className="pet-list-img" alt={pet.name} src={pet.image_url} />
          <div className="pet-card-mask">
            <h2>{pet.name}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default withRouter(PetsView)