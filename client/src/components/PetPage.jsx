import React, { Component } from 'react';
import EditPet from './EditPet'
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class PetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isEventEdit: false,
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
    this.props.setPetIdOnEventForm(this.props.id);
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
          {this.props.currentUser &&
            <Link to={`/pets/${pet.id}/events`}>
              <button>Medical Log</button>
            </Link>
          }

          {/* <a href="#service-provider-section">Service Providers</a> */}
        </div>

        <div id="pet-profile-section" className="pet-profile-page">
          {pet === undefined ? <h2>Loading . . .</h2> : (
            <>
              <div id="pet-profile-main-screen"
                style={{
                  backgroundImage: `${linear_gradient}, url(${pet.image_url}) `
                }}>
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
                    {this.props.currentUser &&
                      <div className="pet-name-div">
                        <button className="submit-button" onClick={() => {
                          this.setState({
                            isEdit: true
                          })
                          this.props.history.push(`/pets/${pet.id}/edit`)
                        }}>Edit</button>
                        <button className="submit-button" onClick={() => {
                          this.props.deletePet(pet.id);
                          this.props.history.push('/')
                        }}>Delete</button>
                      </div>
                    }
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
              </div>

            </>

          )}
        </div>

        }} />

      </>)
  }
}

export default withRouter(PetsPage);