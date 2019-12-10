import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class EventPage extends Component {
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
          {pet &&
            <Link to={`/pets/${pet.id}`}>
              <button>Pet Profile</button>
            </Link>
          }
          {this.props.currentUser && pet &&
            <Link to={`/pets/${pet.id}/events`}>
              <button>Medical Log</button>
            </Link>
          }

          {/* <a href="#service-provider-section">Service Providers</a> */}
        </div>

        <div id="pet-profile-section" className="pet-profile-page">
          {pet === undefined ? <h2>Loading . . .</h2> : (
            <>
              <div id="medical-profile-section"
                style={{
                  backgroundImage: `${linear_gradient}, url(${pet.image_url}) `
                }}
              >
                <h1>Medical Log</h1>
                {this.props.currentUser &&

                  <div className="add-med-card">
                    <Link id="new-med-event" to={`/pets/${pet.id}/events/new`} >
                      <img alt="Add medical history"
                        src="https://icon-library.net/images/white-plus-icon/white-plus-icon-3.jpg"
                        className="plus-sign" />
                      <h3>Add medical history</h3>
                    </Link>
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
                        <p>{med_event.expiration_date ? "Expiration/Due Date: " : ""}  {med_event.expiration_date}</p>
                        {this.props.currentUser &&
                          <div id="med-card-buttons">
                            <Link to={`/pets/${pet.id}/events/${med_event.id}/edit`} >
                              <button className="submit-button">Edit</button>
                            </Link>
                            <button className="submit-button" onClick={() => {
                              this.props.deleteEvent(pet.id, med_event.id);
                            }}>Delete</button>
                            <br />
                          </div>
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



      </>)
  }
}

export default withRouter(EventPage);