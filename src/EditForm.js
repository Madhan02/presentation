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
