import React from 'react';
import { Link } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const Login = (props) => {

  return (
    <div className="auth-container">

      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();
      }} >
        
        <div className="login-div">
          <h2>login</h2>
          <p>Username:</p>
          <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
          <p>Password:</p>
          <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />

          <div className="button-div">
            <button className="submit-button">Login</button>
          </div>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
