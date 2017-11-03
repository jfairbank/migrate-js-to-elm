import React from 'react';
import './AddNote.css';

const AddNote = ({ onAdd }) => (
  <div className="add-note">
    <button onClick={onAdd}>
      + Add New Note
    </button>
  </div>
);

export default AddNote;
