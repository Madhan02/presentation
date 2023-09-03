import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from './EditForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get('http://localhost:5000/api/contacts');
    setContacts(response.data);
  };

  const createContact = async () => {
    if (firstName && lastName) {
      const response = await axios.post('http://localhost:5000/api/contacts', {
        firstName,
        lastName,
      });
      setContacts([...contacts, response.data]);
      setFirstName('');
      setLastName('');
    }
  };

  const editContact = (contact) => {
    setEditingContact(contact);
  };

  // const editContact = async (id, updatedData) => {
  //   const response = await axios.put(`http://localhost:5000/api/contacts/${id}`, updatedData);
  //   console.log(updatedData);
  //   const updatedContacts = contacts.map((contact) => (contact._id === id ? response.data : contact));
  //   setContacts(updatedContacts);
  // };
  const saveEditedContact = async (editedContact) => {
    const response = await axios.put(`http://localhost:5000/api/contacts/${editedContact._id}`, editedContact);
    const updatedContacts = contacts.map((contact) => (contact._id === editedContact._id ? response.data : contact));
    setContacts(updatedContacts);
    setEditingContact(null); 
  };

  const deleteContact = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this contact?");
  
    if (userConfirmed) {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      const updatedContacts = contacts.filter((contact) => contact._id !== id);
      setContacts(updatedContacts);
    }
  };

  return (
    <div className="App">
      <h1>Create Contacts</h1>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={createContact}>Create Contact</button>
      </div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.firstName} {contact.lastName}
            <button onClick={() => editContact(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingContact && (
        <EditForm
          contact={editingContact}
          onSave={saveEditedContact}
          onCancel={() => setEditingContact(null)}
        />
      )}
    </div>
  );
}

export default App;



// Create a new directory for your project and navigate to it in the terminal.
// npm init -y
//npm install express mongoose cors
//Create a server.js file for your backend:
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 5000;

// mongoose.connect('mongodb://0.0.0.0:27017/contacts', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const contactSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
// });

// const Contact = mongoose.model('Contact', contactSchema);

// app.use(cors());
// app.use(express.json());

// app.get('/api/contacts', async (req, res) => {
//   const contacts = await Contact.find();
//   res.json(contacts);
// });

// app.post('/api/contacts', async (req, res) => {
//   const newContact = new Contact(req.body);
//   await newContact.save();
//   res.json(newContact);
// });

// app.put('/api/contacts/:id', async (req, res) => {
//   const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedContact);
// });

// app.delete('/api/contacts/:id', async (req, res) => {
//   await Contact.findByIdAndRemove(req.params.id);
//   res.json({ message: 'Contact deleted' });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// node server.js

//Frontend (React)
// npx create-react-app front-end
//leave App.js as it now
//Create a new component for the edit form. In your src directory, create a file named EditForm.js:
// import React, { useState } from 'react';

// const EditForm = ({ contact, onSave, onCancel }) => {
//   const [editedContact, setEditedContact] = useState(contact);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedContact({
//       ...editedContact,
//       [name]: value,
//     });
//   };

//   const handleSave = () => {
//     onSave(editedContact);
//     onCancel();
//   };

//   return (
//     <div className="edit-form">
//       <h2>Edit Contact</h2>
//       <label>
//         First Name:
//         <input
//           type="text"
//           name="firstName"
//           value={editedContact.firstName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           type="text"
//           name="lastName"
//           value={editedContact.lastName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <button onClick={handleSave}>Save</button>
//       <button onClick={onCancel}>Cancel</button>
//     </div>
//   );
// };

// export default EditForm;
