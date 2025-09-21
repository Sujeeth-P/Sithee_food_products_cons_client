import React from 'react'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../../components/css/Profile.css'

function Profile() {
  const { user, logout } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleclick = (user) => {
    setSelectedUser(user);
    console.log("Selected user for editing:", user);
    // Here you can add logic to open a modal or navigate to an edit page
  }
  const handleSaveChanges = (user) => {
    // Logic to save changes to the user's profile
    console.log("Saving changes for user:", user);
    setSelectedUser(null); // Close the edit modal after saving
  }

  return (
    <div className="container">
      <div className="container-profile">
        <section className="profile-section">
          <div className="container-profile-left">
            <h2>Welcome, {user.name}!</h2>
            <p>This is your profile page. Here you can view and edit your personal information.</p>
          </div>
          <div className="container-profile-right">
            <Button variant="outline-primary" onClick={() => handleclick(user)}>Edit Profile</Button>
          </div>
        </section>


        <section className="profile-section-2">
            <div className="user-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
        </section>
      </div>
        {selectedUser && (
          <div className="profile-card">
          <Card className="profile-edit-card">
            <button className="close-modal" onClick={() => setSelectedUser(null)}>×</button>
            <Card.Body>
              <Card.Title>Profile Details</Card.Title>
              <Card.Text style={{ marginTop: '2rem' }}>
                <Form>
                <p><strong>Name</strong><Form.Control type="text" defaultValue={selectedUser.name} /></p>
                <p><strong>Email</strong><Form.Control type="text" defaultValue={selectedUser.email} /></p>
              </Form>
              </Card.Text>
              <Button variant="outline-primary" style={{ marginTop: '2rem' }} onClick={() => handleSaveChanges(selectedUser)}>Save Changes</Button>
          {/* <section className="profile-edit-section">
          <div className="edit-profile-modal">
            <h3>Edit Profile for {selectedUser.name}</h3>
          </div>
          </section> */}
            </Card.Body>
          </Card>
          </div>
        )}

    </div>
  )
}

export default Profile