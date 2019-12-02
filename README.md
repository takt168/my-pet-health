# My Pet Health

## Project Description
My Peth Health is a full CRUD application with Authentication.  A registered user can create a profile for their pet(s).  Once a pet's profile is created, a user can then go onto enter pertinent information about the pet like the name, species, breed, image.  A user can also store pertienent medical information about the pet like vaccinations, allergies, or past/upcoming appointments.  A user can also save information about the veterinarians, dog walkers, groomer, pet sitters, boarding facilities or any other key contact in your pet's life. 
### MVP Features
* User Auth(Login/Register)
* User can do full CRUD on a pet profile (name, image, species, breed, birth date/age, color)
* User can do full CRUD on a pet's medical information (vaccinations, allergies, food) 

### POST-MVP Features
* User can do full CRUD on a pet's provider information (name, provider type, phone number, website, image)
* Setup reminders in the app, to remind users when vaccinations expire or annual checkups are due.
        
<!--##Feature List
  List of pieces of functionality of the app.
-->   
## Installation Instructions
From the home directory of the project, run `bundle` to install all of the Rails depencendies.    Then runs `rails s` to start up the backend server.

Next go into the client directory and run `npm i` to install the react front end dependencies.  Once that completes, run `npm start` to start the front end web applications.

## Entity Relationship Diagram (ERD)
![My Pet Health ERD](https://res.cloudinary.com/du4z2ezqn/image/upload/v1575254427/My-Pet-Health-ERD_mus7lc.png)

## Wireframes
    - **Wireframes** **Hi-fi wireframes ONLY**, please use your wireframes to demonstrate the user journey. Think of how the user will interact with the UI of your app.
## React Component Hierarchy
```
<App>
  <Header>
  <Main>
    <RegisterFom>
    <LoginForm>
      <PetContainer>
        <PetList>
        <CreatePet>
        <UpdatePet>
      <MedicalEventContainer>
        <MedicalEvent>
        <CreateMedicalEvent>
        <UpdateMedicalEvent>
  <Footer>
```
## API Endopint Documentation
|Endpoint|Purpose|
|---|---|
|/auth/register|for User registration|
|/auth/login|for User login|
|/auth/verify|for User verify|
|/pets|for Pet- Read Index and Create |
|/pets/:petId|for Pet - Read Show, Update, and Delete |
|/pets/:petId/events|for Medical Event- Read Index and Create |
|/pets/:petId/events/:eventId|for Medical Event - Read Show, Update, and Delete |

<!--
##Depencies
    - **List Dependencies** link to any project dependencies (e.g. 3rd party APIs, libraries, linter, etc).
    - Installation instructions (at the top of the README)
-->
## Technologies used
### Backend
* PostgreSql database
* Ruby on Rails

### Frontend
* React Router
* HTML, CSS, JavaScript

<!--
##Additional Libraries
    -  **Additional libraries**  - list all additional libraries you are planning to use.
##Timeframes
    -  **Timeframes** - Timeframes are a key in the development cycle.  You have limited time to code all parts of the app. 
    
    Your estimates can help you organize your workload better. Example:
 

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Adding Form | H | 3hrs| 3.5hrs | 3.5hrs |
| Working with API | H | 3hrs| 2.5hrs | 2.5hrs |
| Total | H | 6hrs| 5hrs | 5hrs |
-->