import React from 'react'
import '../../components/css/Profile.css'

function Profile() {
  return (
    <div className="container">
      <div className="container-profile"> 
        <h1>User Profile</h1>
        <p>This is the profile page where user information will be displayed.</p>
        <button>Edit Profile</button>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Profile