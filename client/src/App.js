import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import PetsView from './components/PetsView';
import PetPage from './components/PetPage';
import CreatePet from './components/CreatePet'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header';
import EventPage from './components/EventPage';
import CreateEvent from './components/CreateEvent';
import EditPet from './components/EditPet';
import EditEvent from './components/EditEvent';

import {
  createPet,
  readAllPets,
  updatePet,
  destroyPet,
  createEvent,
  readAllEvents,
  updateEvent,
  destroyEvent,
  loginUser,
  registerUser,
  verifyUser
} from './services/api-helper'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      petForm: {
        name: "",
        description: "",
        species: "",
        breed: "",
        birth_date: "",
        image_url: "",
        user_id: ""
      },
      events: [],
      eventForm: {
        name: "",
        event_type: "",
        event_date: "",
        expiration_date: "",
        pet_id: ""
      },
      currentUser: null,
      currentUserId: "",
      authFormData: {
        username: "",
        email: "",
        password: ""
      },
      showInfo: "true",
      showMedical: null
    };
  }

  async componentDidMount() {
    this.getPets();
    this.getEvents();
    const currentUser = await verifyUser();
    const currentUserId = currentUser.id;
    if (currentUser) {
      this.setState(prevState => ({
        currentUser,
        currentUserId,
        petForm: {
          ...prevState.petForm,
          user_id: currentUser.id
        }
      }))
    }
  }

  // ***************  PETS  *************** 

  getPets = async () => {
    const pets = await readAllPets();
    this.setState({
      pets
    })
  }

  setPetIdOnEventForm = (pet_id) => {
    this.setState(prevState => ({
      eventForm: {
        ...prevState.eventForm,
        pet_id
      }
    }))
  }

  newPet = async (e) => {
    e.preventDefault();
    const pet = await createPet(this.state.petForm);
    this.setState(prevState => ({
      pets: [...prevState.pets, pet],
      petForm: {
        name: "",
        description: "",
        species: "",
        breed: "",
        birth_date: "",
        image_url: ""
      }
    }))
    this.props.history.push(`/pets/${pet.id}`)
  }

  editPet = async (e) => {
    e.preventDefault();
    const { petForm } = this.state
    await updatePet(petForm.id, petForm);
    this.setState(prevState => (
      {
        pets: prevState.pets.map(pet => {
          return pet.id === petForm.id ? petForm : pet
        }),
      }
    ))
    this.props.history.push(`/pets/${petForm.id}`)
  }

  deletePet = async (id) => {
    await destroyPet(id);
    this.setState(prevState => ({
      pets: prevState.pets.filter(pet => pet.id !== id)
    }))
    this.props.history.push("/")
  }

  // ***************  EVENTS  ***************

  getEvents = async () => {
    const events = await readAllEvents();
    this.setState({
      events
    })
  }

  newEvent = async (e) => {
    e.preventDefault();
    const pet_id = this.state.eventForm.pet_id
    const event = await createEvent(this.state.eventForm);
    this.setState(prevState => ({
      events: [...prevState.events, event],
      eventForm: {
        name: "",
        event_type: "",
        event_date: "",
        expiration_date: "",
        pet_id: ""
      }
    }))
    this.props.history.push(`/pets/${pet_id}/events`)
  }

  editEvent = async (id) => {
    const { eventForm } = this.state
    this.setState(prevState => ({
      eventForm: {
        ...prevState.eventForm,
        id
      }
    }))

    await updateEvent(eventForm.id, eventForm);
    this.setState(prevState => (
      {
        events: prevState.events.map(event => {
          return event.id === eventForm.id ? eventForm : event
        }),
      }
    ))

    this.setState(prevState => ({
      eventForm: {

        name: "",
        event_type: "",
        event_date: "",
        expiration_date: ""
      }
    }))

    this.props.history.push(`/pets/${eventForm.pet_id}/events`)
  }

  deleteEvent = async (petId, eventId) => {
    await destroyEvent(eventId);
    this.setState(prevState => ({
      pets: prevState.events.filter(event => event.id !== eventId)
    }))

    //TODO fix this route
    this.props.history.push(`/pets/${petId}/events`)
    window.location.reload();
  }

  // ***************  FORMS  *************** 

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      petForm: {
        ...prevState.petForm,
        [name]: value
      }
    }))
  }

  handleEventFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      eventForm: {
        ...prevState.eventForm,
        [name]: value
      }
    }))
  }

  mountEditForm = async (id) => {
    const pets = await readAllPets();
    const pet = pets.find(el => el.id === parseInt(id));
    this.setState({
      petForm: pet
    });
  }

  mountEventEditForm = async (id) => {
    const events = await readAllEvents();
    const event = events.find(el => el.id === parseInt(id));
    this.setState({
      eventForm: event
    });
  }

  resetPetForm = () => {
    this.setState({
      petForm: {
        name: "",
        description: "",
        species: "",
        breed: "",
        birth_date: "",
        image_url: "",
        user_id: ""
      }
    })
  }


  resetAuthForm = () => {
    this.setState({
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    })
  }

  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState(prevState => ({
      currentUser,
      petForm: {
        ...prevState.petForm,
        user_id: currentUser.id
      }
    }));
    this.resetAuthForm();
    this.props.history.push("/")
    window.location.reload();
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
    this.resetAuthForm();
    this.props.history.push("/")
    // window.location.reload();
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
    this.props.history.push("/")
    window.location.reload();
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App" >
        <Header
          handleLoginButton={this.handleLoginButton}
          handleLogout={this.handleLogout}
          currentUser={this.state.currentUser}
          resetPetForm={this.resetPetForm}
        />
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route
          exact path="/"

          render={() => (
            <PetsView
              pets={this.state.pets}
              petForm={this.state.petForm}
              handleFormChange={this.handleFormChange}
              newPet={this.newPet}
              currentUser={this.state.currentUser}
              currentUserId={this.state.currentUserId}
            />
          )}
        />
        <Route
          exact path="/pets"
          render={() => (
            <PetsView
              pets={this.state.pets}
              petForm={this.state.petForm}
              handleFormChange={this.handleFormChange}
              newPet={this.newPet}
              currentUser={this.state.currentUser} />
          )}
        />
        <Route
          exact path="/new/pet"
          render={() => (
            <CreatePet
              handleFormChange={this.handleFormChange}
              petForm={this.state.petForm}
              newPet={this.newPet}
              currentUser={this.state.currentUser}
            />
          )} />
        <Route
          exact path="/pets/:id"
          render={(props) => {
            const { id } = props.match.params;
            const pet = this.state.pets.find(el => el.id === parseInt(id));
            return <PetPage
              id={id}
              pet={pet}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editPet={this.editPet}
              petForm={this.state.petForm}
              deletePet={this.deletePet}
              events={this.state.events}
              deleteEvent={this.deleteEvent}
              eventForm={this.state.eventForm}
              editEvent={this.editEvent}
              mountEventEditForm={this.mountEventEditForm}
              handleEventFormChange={this.handleEventFormChange}
              showInfo={this.state.showInfo}
              showMedical={this.state.showMedical}
              setPetIdOnEventForm={this.setPetIdOnEventForm}
              currentUser={this.state.currentUser}
            />
          }}
        />

        <Route
          exact path="/pets/:id/edit"
          render={(props) => {
            const { id } = props.match.params;
            const pet = this.state.pets.find(el => el.id === parseInt(id));
            return <EditPet
              id={id}
              pet={pet}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editPet={this.editPet}
              petForm={this.state.petForm}
              deletePet={this.deletePet}
              events={this.state.events}
              deleteEvent={this.deleteEvent}
              eventForm={this.state.eventForm}
              editEvent={this.editEvent}
              mountEventEditForm={this.mountEventEditForm}
              handleEventFormChange={this.handleEventFormChange}
              showInfo={this.state.showInfo}
              showMedical={this.state.showMedical}
              setPetIdOnEventForm={this.setPetIdOnEventForm}
              currentUser={this.state.currentUser}
            />
          }}
        />

        <Route
          exact path="/pets/:id/events"
          render={(props) => {
            const { id } = props.match.params;
            const pet = this.state.pets.find(el => el.id === parseInt(id));
            return <EventPage
              id={id}
              pet={pet}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editPet={this.editPet}
              petForm={this.state.petForm}
              deletePet={this.deletePet}
              events={this.state.events}
              deleteEvent={this.deleteEvent}
              eventForm={this.state.eventForm}
              editEvent={this.editEvent}
              mountEventEditForm={this.mountEventEditForm}
              handleEventFormChange={this.handleEventFormChange}
              showInfo={this.state.showInfo}
              showMedical={this.state.showMedical}
              setPetIdOnEventForm={this.setPetIdOnEventForm}
              currentUser={this.state.currentUser}
            />
          }}
        />

        <Route
          exact path="/pets/:id/events/new"
          render={(props) => {
            const { id } = props.match.params;
            const pet = this.state.pets.find(el => el.id === parseInt(id));

            return <CreateEvent
              pet={pet}
              handleEventFormChange={this.handleEventFormChange}
              eventForm={this.state.eventForm}
              newEvent={this.newEvent} />
          }} />

        <Route
          exact path="/pets/:id/events/:event_id/edit"
          render={(props) => {
            const { id, event_id } = props.match.params;
            const pet = this.state.pets.find(el => el.id === parseInt(id));
            return <EditEvent
              petId={id}
              eventId={event_id}
              mountEventEditForm={this.mountEventEditForm}
              handleEventFormChange={this.handleEventFormChange}
              eventForm={this.state.eventForm}
              editEvent={this.editEvent}
              pet={pet}
              handleSubmit={(e) => {
                e.preventDefault();
                this.editEvent(event_id);
              }}

            />
          }}
        />
        <footer>
          <h4>&copy;Tak Tsukamoto</h4>
          <a href="https://github.com/takt168/my-pet-health" target="_blank" rel="noopener noreferrer">
            <img alt="github" src="https://res.cloudinary.com/du4z2ezqn/image/upload/v1576005340/iconmonstr-github-1-240_fgwbgk.png" />
          </a>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);