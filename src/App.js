import React, { Component } from 'react';
import Note from './Note';
import NotesList from './NotesList';
import AddNote from './AddNote';
import * as remoteNotes from './remoteNotes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const notes = remoteNotes.getAll();

    this.state = {
      notes,
      selectedNoteIndex: 0,
    };
  }

  addNote = (note) => {
    this.setState((oldState) => {
      const notes = remoteNotes.addNote(note);

      return {
        notes,
        selectedNoteIndex: notes.length - 1,
      };
    });
  }

  updateNote = (note) => {
    const notes = remoteNotes.updateNote(note);

    this.setState({ notes });
  }

  selectNote = (note) => {
    const index = this.state.notes.findIndex(
      otherNote => otherNote.id === note.id,
    );

    if (index === -1) {
      return;
    }

    this.setState({ selectedNoteIndex: index });
  }

  getSelectedNote() {
    return this.state.notes[this.state.selectedNoteIndex];
  }

  render() {
    const selectedNote = this.getSelectedNote();

    return (
      <div className="app">
        <div className="app_sidebar">
          <NotesList
            notes={this.state.notes}
            selectedNote={selectedNote}
            onSelectNote={this.selectNote}
          />
          
          <AddNote onAdd={this.addNote} />
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
