import React, { useState } from 'react';

const EditForm = ({ contact, onSave, onCancel }) => {
  const [editedContact, setEditedContact] = useState(contact);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({
      ...editedContact,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedContact);
    onCancel();
  };

  return (
    <div className="edit-form">
      <h2>Edit Contact</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={editedContact.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={editedContact.lastName}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

function EditContactForm({ history, match }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    // Fetch the contact details by ID when the component mounts
    axios.get(`/api/contacts/${match.params.id}`)
      .then((response) => {
        const contactData = response.data;
        setFormData({
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
        });
      })
      .catch((error) => {
        console.error('Error fetching contact:', error);
      });
  }, [match.params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the contact by sending a PUT request to the server
    axios.put(`/api/contacts/${match.params.id}`, formData)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.error('Error updating contact:', error);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Edit Contact
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Save Changes
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EditContactForm;
