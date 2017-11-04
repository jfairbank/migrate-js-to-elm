import React from 'react';
import classNames from 'classnames';
import './NotesList.css';

const NotesList = ({ notes, selectedNote, onSelectNote }) => (
  <ul className="notes-list">
    {notes.map(note => (
      <li
        className={classNames(
          'notes-list__item',
          { 'notes-list__item--selected': selectedNote && note.id === selectedNote.id }
        )}
        key={note.id}
        tabIndex={0}
        onClick={() => onSelectNote(note)}
      >
        {note.title.trim() || 'Untitled'}
      </li>
    ))}
  </ul>
);

export default NotesList;
