import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header>
      <Link to='/' onClick={props.resetForm}>
        <img src="https://res.cloudinary.com/du4z2ezqn/image/upload/v1575340470/Screen_Shot_2019-12-02_at_9.34.01_PM_a7p96d.png"
          alt="logo" />
      </Link>
      <h1><Link to='/' onClick={props.resetForm}>My Pet Health</Link></h1>
      <div id="header-user-info">
        {props.currentUser
          ?
          <>
            <p>{props.currentUser.username}</p>
            <div className="button-div">
              <button className="submit-button" onClick={props.handleLogout}>logout</button>
            </div>
          </>
          :
          <div className="button-div">
            <button className="submit-button" onClick={props.handleLoginButton}>Login/register</button>
          </div>
        }
      </div>
    </header>
  )
}
