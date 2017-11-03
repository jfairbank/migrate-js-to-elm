import React, { Component } from 'react';
import ImageUpload from './ImageUpload';

class Note extends Component {
  componentDidMount() {
    this.selectTitleRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.note.id !== this.props.note.id) {
      this.selectTitleRef();
    }
  }

  selectTitleRef() {
    this.titleRef.focus();
    this.titleRef.select();
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

  updateImages = (images) => {
    this.update('images', images);
  }

  deleteImage = (id) => {
    this.updateImages(this.props.note.images.filter(
      image => image.id !== id
    ));
  }

  render() {
    const { note } = this.props;

    return (
      <div>
        <div>
          <input
            ref={(node) => { this.titleRef = node; }}
            type="text"
            value={note.title}
            onChange={this.updateField('title')}
          />
        </div>

        <div>
          <textarea
            onChange={this.updateField('description')}
            value={note.description}
          />
        </div>

        <ImageUpload
          images={note.images}
          onUpload={this.updateImages}
          onDelete={this.deleteImage}
        />
      </div>
    );
  }
}

export default Note;
