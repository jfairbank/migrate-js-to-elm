import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import './Note.css';

class Note extends Component {
  componentDidMount() {
    this.selectTitleRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.note.id !== this.props.note.id) {
      this.selectTitleRef();
    }
  }

  deleteNote = () => {
    this.props.onDelete(this.props.note);
  }

  selectTitleRef() {
    this.titleRef.focus();
    this.titleRef.select();
  }

  setTitleRef = (node) => {
    this.titleRef = node;
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

  addImages = (images) => {
    this.update('images', this.props.note.images.concat(images));
  }

  deleteImage = (id) => {
    this.update(
      'images',
      this.props.note.images.filter(image => image.id !== id),
    );
  }

  render() {
    const { note } = this.props;

    return (
      <div className="note">
        <div className="note__info">
          <h2>Info</h2>

          <div className="note__title">
            <input
              ref={this.setTitleRef}
              type="text"
              value={note.title}
              placeholder="Title"
              onChange={this.updateField('title')}
            />
          </div>

          <div className="note__description">
            <textarea
              value={note.description}
              placeholder="Description"
              onChange={this.updateField('description')}
            />
          </div>
        </div>

        <div className="note__images">
          <h2>Images</h2>

          <ImageUpload
            images={note.images}
            onUpload={this.addImages}
            onDelete={this.deleteImage}
          />
        </div>

        {/*
        <div className="note__delete">
          <button onClick={this.deleteNote}>
            Delete
          </button>
        </div>
        {/**/}
      </div>
    );
  }
}

export default Note;
