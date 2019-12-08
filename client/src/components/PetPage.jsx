import React, { Component } from 'react';
import EditPet from './EditPet'
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import EditEvent from './EditEvent';

class PetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isEventEdit: false,
      showMedical: this.props.showMedical,
      showInfo: this.props.showInfo
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
    this.props.setPetIdOnEventForm(this.props.id);

    console.log(this.props.image_url)
  }

  displayMedical = () => {
    this.setState({
      showMedical: "true",
      showInfo: null
    })
  }

  displayInfo = () => {
    this.setState({
      showMedical: null,
      showInfo: "true"
    })
  }

  render() {



    const { pet } = this.props;
    const linear_gradient = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4))`
    return (
      <>
        <div className="sidenav">
          <button onClick={this.displayInfo} >Pet Profile</button>
          {this.props.currentUser &&

            <button onClick={this.displayMedical} >Medical Log</button>
          }
          {/* <a href="#service-provider-section">Service Providers</a> */}
        </div>

        <div id="pet-profile-section" className="pet-profile-page">
          {pet === undefined ? <h2>Loading . . .</h2> : (
            <>
              {this.state.showInfo && <div id="pet-profile-main-screen"
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
              }

              {this.state.showMedical && <div id="medical-profile-section"
                style={{
                  backgroundImage: `${linear_gradient}, url(${pet.image_url}) `
                }}>
                <h2>Medical Info</h2>
                {this.props.currentUser &&

                  <div className="add-med-card">
                    <Link to={`/pets/${pet.id}/new/event`} >
                      <img alt="Add medical history"
                        src="https://icon-library.net/images/white-plus-icon/white-plus-icon-3.jpg"
                        className="plus-sign" />
                    </Link>
                    <h3>Add medical history</h3>
                  </div>
                }
                <div className="med-event-container">
                  {this.props.events && this.props.events
                    .filter(med => parseInt(this.props.id) === med.pet_id)
                    .map(med_event => (
                      <div key={med_event.id} className="med-card">
                        <p>{med_event.event_date}</p>
                        <p>{med_event.name}</p>
                        <p>{med_event.event_type}</p>
                        <p>Exipiration/Due Date: {med_event.expiration_date}</p>
                        {this.props.currentUser &&
                          <>
                            <Link to={`/pets/${pet.id}/events/${med_event.id}/edit`} >
                              <button className="submit-button">Edit</button>
                            </Link>
                            <button className="submit-button" onClick={() => {
                              this.props.deleteEvent(med_event.id);
                              this.props.history.push('/')
                            }}>Delete</button>
                            <br />
                          </>
                        }
                      </div>
                    ))}
                </div>
              </div>
              }

              {/* <div id="service-provider-section"
                style={{
                  backgroundImage: `${linear_gradient}, url(${pet.image_url}) `
                }}>
                <h2>Service Providers</h2>
                <h3>Coming soon....</h3>

              </div> */}
            </>

          )}
        </div>

        <Route
          exact path="/pets/:id/events/:event_id/edit"
          render={(props) => {
            const { id, event_id } = props.match.params;
            console.log(`event_id: ${event_id}`)
            return <EditEvent
              petId={id}
              eventId={event_id}
              mountEventEditForm={this.props.mountEventEditForm}
              handleEventFormChange={this.props.handleEventFormChange}
              eventForm={this.props.eventForm}
              editEvent={this.props.editEvent}
              pet={this.props.pet}
              handleSubmit={(e) => {
                e.preventDefault();
                this.props.editEvent(event_id);
                this.setState({ isEventEdit: false })
                this.props.history.push(`/pets/${id}`)
              }}

            />

          }} />

      </>)
  }
}

export default withRouter(PetsPage);