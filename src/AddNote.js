import React, { Component } from 'react';

class AddNote extends Component {
  state = {
    title: '',
  }

  addNote = () => {
    this.props.onAddNote({
      title: this.state.title,
    });

    this.setState({ title: '' });
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    return (
      <div>
        <label>Title:</label>
        
        <input
          type="text"
          value={this.state.title}
          onChange={this.update('title')}
        />

        <button onClick={this.addNote}>Add</button>
      </div>
    );
  }
}

export default AddNote;
