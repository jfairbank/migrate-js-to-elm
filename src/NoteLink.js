import React, { Component } from 'react';
import Link from './Link';

class NoteLink extends Component {
  selectNote = () => {
    this.props.onSelectNote(this.props.note);
  }

  render() {
    return (
      <Link onClick={this.selectNote}>
        {this.props.note.title}
      </Link>
    );
  }
}

export default NoteLink;
