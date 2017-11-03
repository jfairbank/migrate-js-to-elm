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
    const note = localStorage.getItem('note');

    if (!note) {
      return {
        id: cuid(),
        title: 'Untitled',
        contents: '',
      };
    }

    return JSON.parse(note);
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
            <input
              type="text"
              value={note.title}
              placeholder="Title"
              onChange={this.updateField('title')}
            />
          </div>

          <div className="note__contents">
            <textarea
              value={note.contents}
              placeholder="Contents"
              onChange={this.updateField('contents')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
