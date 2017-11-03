import React, { Component } from 'react';
import ImageUpload from './ImageUpload';

class Note extends Component {
  constructor(props) {
    super(props);

    const { note } = props;

    this.state = {
      title: note.title,
      description: note.description,
      images: note.images,
    };
  }

  save = () => {
    this.props.onSave({
      ...this.props.note,
      ...this.state,
    });
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  setImages = (images) => {
    this.setState({ images });
  }

  deleteImage = (id) => {
    this.setState(({ images }) => ({
      images: images.filter(image => image.id !== id),
    }));
  }

  render() {
    const { state } = this;
    const { onCancel } = this.props;
    const canSave = state.title.length > 0;

    return (
      <div>
        <div>
          <input
            type="text"
            value={state.title}
            onChange={this.update('title')}
          />
        </div>

        <div>
          <textarea
            onChange={this.update('description')}
            value={state.description}
          />
        </div>

        <ImageUpload
          images={state.images}
          onUpload={this.setImages}
          onDelete={this.deleteImage}
        />

        <div>
          <button onClick={onCancel}>
            Cancel
          </button>

          <button
            onClick={this.save}
            disabled={!canSave}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default Note;
