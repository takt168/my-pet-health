import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import PetsView from './components/PetsView';
import PetPage from './components/PetPage';
import CreatePet from './components/CreatePet'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header';

import {
  createPet,
  readAllPets,
  updatePet,
  destroyPet,
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
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  async componentDidMount() {
    this.getPets();
    const currentUser = await verifyUser();
    console.log(`currentUser: ${currentUser.id}`);
    if (currentUser) {
      this.setState({ currentUser })
      this.setState(prevState => ({
        petForm: {
          ...prevState.petForm,
          user_id: currentUser.id
        }
      }))
    }
  }

  getPets = async () => {
    const pets = await readAllPets();
    this.setState({
      pets
    })
  }

  newPet = async (e) => {
    e.preventDefault();
    console.log("in newPet: ", this.state.petForm)
    const pet = await createPet(this.state.petForm);
    this.setState(prevState => ({
      pets: [...prevState.pets, pet],
      petForm: {
        name: "",
        description: "",
        species: "",
        breed: "",
        birth_date: "",
        image_url: "",
        user_id: ""
      }
    }))
    this.props.history.push("/")
  }

  editPet = async () => {
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

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      petForm: {
        ...prevState.petForm,
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

  resetForm = () => {
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
    this.setState({ currentUser });
    this.resetAuthForm();
    this.props.history.push("/")
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
    this.resetAuthForm();
    this.props.history.push("/")
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
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
              newPet={this.newPet} />
          )}
        />
        <Route
          path="/new/pet"
          render={() => (
            <CreatePet
              handleFormChange={this.handleFormChange}
              petForm={this.state.petForm}
              newPet={this.newPet} />
          )} />
        <Route
          path="/pets/:id"
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
              deletePet={this.deletePet} />
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);