import React from 'react';
import NoteLink from './NoteLink';

const NotesList = ({ notes, onSelectNote }) => (
  <ul>
    {notes.map(note => (
      <li key={note.id}>
        <NoteLink
          note={note}
          onSelectNote={onSelectNote}
        />
      </li>
    ))}
  </ul>
);

export default NotesList;
