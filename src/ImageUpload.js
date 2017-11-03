import React, { Component } from 'react';
import Elm from './ImageUpload.elm';
import cuid from 'cuid';

function readImage(file) {
  const reader = new FileReader();

  const promise = new Promise((resolve) => {
    reader.onload = (e) => {
      const id = cuid();
      const imageContents = e.target.result;

      const image = {
        id,
        contents: imageContents,
      };

      resolve(image);
    };
  });

  reader.readAsDataURL(file);

  return promise;
}

class ImageUpload extends Component {
  imageUploaderId = 'file-upload'

  readImages = (images) => {
    const element = document.getElementById(this.imageUploaderId);
    const files = Array.from(element.files);

    Promise.all(files.map(readImage))
      .then(this.props.onUpload);
  }

  componentDidMount() {
    this.imageUploader = Elm.ImageUpload.embed(this.imageUploaderRef, {
      id: this.imageUploaderId,
      images: this.props.images,
      onUpload: this.props.onUpload,
      onDelete: this.props.onDelete,
    });

    this.imageUploader.ports.uploadImage.subscribe(this.readImages);
    this.imageUploader.ports.deleteImage.subscribe(this.props.onDelete);
  }

  componentWillUnmount() {
    this.imageUploader.ports.uploadImage.unsubscribe(this.readImages);
    this.imageUploader.ports.deleteImage.unsubscribe(this.props.onDelete);
  }

  componentWillReceiveProps(nextProps) {
    this.imageUploader.ports.receiveImages.send(nextProps.images);
  }

  setImageUploaderRef = (node) => {
    this.imageUploaderRef = node;
  }

  render() {
    return (
      <div ref={this.setImageUploaderRef} />
    );
  }
}

export default ImageUpload;
