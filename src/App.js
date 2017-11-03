import React, { Component } from 'react';
import Note from './Note';
import NotesList from './NotesList';
import AddNote from './AddNote';
import * as remoteNotes from './remoteNotes';

class App extends Component {
  constructor(props) {
    super(props);

    const notes = remoteNotes.getAll();

    if (notes.length > 0) {
      this.state = {
        notes,
        selectedNote: notes[0],
        page: 'NOTE',
      };
    } else {
      this.state = {
        notes,
        selectedNote: null,
        page: 'NOTES',
      };
    }
  }

  addNote = (note) => {
    this.setState(({ notes }) => {
      const newNote = remoteNotes.addNote(note);

      return {
        notes: notes.concat(newNote),
      };
    });
  }

  saveNote = (note) => {
    const notes = remoteNotes.updateNote(note);

    this.setState({
      notes,
      selectedNote: null,
      page: 'NOTES',
    });
  }

  viewNotes = () => {
    this.setState({
      selectedNote: null,
      page: 'NOTES',
    });
  }

  viewNote = (note) => {
    this.setState({
      selectedNote: note,
      page: 'NOTE',
    });
  }

  render() {
    if (this.state.page === 'NOTE') {
      return (
        <Note
          note={this.state.selectedNote}
          onCancel={this.viewNotes}
          onSave={this.saveNote}
        />
      );
    }

    return (
      <div>
        <NotesList
          notes={this.state.notes}
          onSelectNote={this.viewNote}
        />

        <AddNote onAddNote={this.addNote} />
      </div>
    );
  }
}

export default App;
