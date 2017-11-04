import React, { Component } from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import Note from './Note';
import NotesList from './NotesList';
import AddNote from './AddNote';
import * as remoteNotes from './remoteNotes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const notes = remoteNotes.getAll();
    const firstId = get(notes, '[0].id', null);

    this.state = {
      notes,
      selectedNoteId: firstId,
    };

    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
  }

  addNote() {
    this.setState((oldState) => {
      const notes = remoteNotes.createNote();
      const lastId = get(notes, [notes.length - 1, 'id'], null);

      return {
        notes,
        selectedNoteId: lastId,
      };
    });
  }

  updateNote(note) {
    const notes = remoteNotes.updateNote(note);
    this.setState({ notes });
  }

  selectNote(note) {
    this.setState({ selectedNoteId: note.id });
  }

  getSelectedNote() {
    const { notes, selectedNoteId } = this.state;

    return selectedNoteId
      ? find(notes, { id: this.state.selectedNoteId })
      : null;
  }

  render() {
    const selectedNote = this.getSelectedNote();

    return (
      <div className="app">
        <div className="app__sidebar">
          <NotesList
            notes={this.state.notes}
            selectedNote={selectedNote}
            onSelectNote={this.selectNote}
          />
          
          <div className="app__add-note">
            <AddNote onAdd={this.addNote} />
          </div>
        </div>

        <div className="app_content">
          {selectedNote &&
            <Note
              note={selectedNote}
              onUpdate={this.updateNote}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
