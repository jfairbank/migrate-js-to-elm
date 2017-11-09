import React, { Component } from 'react';
import cuid from 'cuid';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: this.fetchSavedNote(),
    };
  }

  fetchSavedNote() {
    let note = localStorage.getItem('note');

    note = note ? JSON.parse(note) : { id: cuid() };

    return {
      title: '',
      contents: '',
      ...note,
    };
  }

  saveNote(note) {
    localStorage.setItem('note', JSON.stringify(note));
  }

  update(field, value) {
    this.setState((oldState) => {
      const newNote = {
        ...oldState.note,
        [field]: value,
      };

      this.saveNote(newNote);

      return { note: newNote };
    });
  }

  updateField(field) {
    return (e) => {
      this.update(field, e.target.value);
    };
  }

  render() {
    const { note } = this.state;

    return (
      <div className="note">
        <div className="note__info">
          <h2>Info</h2>

          <div className="note__title">
            <label>Title:</label>

            <input
              type="text"
              value={note.title}
              onChange={this.updateField('title')}
            />
          </div>

          <div className="note__contents">
            <label>Contents:</label>

            <textarea
              value={note.contents}
              onChange={this.updateField('contents')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
