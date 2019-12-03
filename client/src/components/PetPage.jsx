import React, { Component } from 'react';
import EditPet from './EditPet'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class PetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { pet } = this.props;
    return (
      <>
        <div class="sidenav">
          <a href="#">Pet Profile</a>
          <a href="#">Medical Log</a>
          <a href="#">Service Providers</a>
        </div>

        <div className="pet-profile-page">
          {pet === undefined ? <h2>Loading . . .</h2> : (
            <div id="pet-profile-main-screen" style={{ backgroundImage: `url(${pet.image_url})` }}>
              {this.state.isEdit ?
                <Route path={'/pets/:id/edit'} render={() => (
                  <EditPet
                    handleFormChange={this.props.handleFormChange}
                    handleSubmit={(e) => {
                      e.preventDefault();
                      this.props.editPet();
                      this.setState({ isEdit: false })
                      this.props.history.push(`/pets/${this.props.petForm.id}`)
                    }}
                    petForm={this.props.petForm} />
                )} />
                :
                <>
                  <div className="pet-name-div">
                    <button onClick={() => {
                      this.setState({
                        isEdit: true
                      })
                      this.props.history.push(`/pets/${pet.id}/edit`)
                    }}>Edit</button>
                    <button onClick={() => {
                      this.props.deletePet(pet.id);
                      this.props.history.push('/')
                    }}>Delete</button>
                  </div>
                  <br />
                  <div className="pet-name-div">
                    <h2>{pet.name}</h2>
                  </div>
                  <br />
                  <div className="pet-name-div">
                    <h3>Bio: {pet.description}</h3>
                  </div>
                  <br />
                  <div className="pet-name-div">
                    <h3>Species: {pet.species}</h3>
                  </div>
                  <br />
                  <div className="pet-name-div">
                    <h3>Breed: {pet.breed}</h3>
                  </div>
                  <br />
                  <div className="pet-name-div">
                    <h3>Birth Date: {pet.birth_date}</h3>
                  </div>
                </>
              }
            </div>)}
        </div>
      </>)
  }
}

export default withRouter(PetsPage);