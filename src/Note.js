import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import './Note.css';

class Note extends Component {
  constructor(props) {
    super(props);

    this.addImages = this.addImages.bind(this);
  }

  update(field, value) {
    this.props.onUpdate({
      ...this.props.note,
      [field]: value,
    });
  }

  updateField(field) {
    return (e) => {
      this.update(field, e.target.value);
    };
  }

  addImages(images) {
    this.update('images', this.props.note.images.concat(images));
  }

  render() {
    const { note } = this.props;

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

        <div className="note__images">
          <h2>Images</h2>

          <ImageUpload
            images={note.images}
            onUpload={this.addImages}
          />
        </div>
      </div>
    );
  }
}

export default Note;
