import React, { Component } from 'react';
import cuid from 'cuid';
import Elm from './ImageUpload.elm';
import './ImageUpload.css';

function readImage(file) {
  const reader = new FileReader();

  const promise = new Promise((resolve) => {
    reader.onload = (e) => {
      resolve({
        id: cuid(),
        url: e.target.result,
      });
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

    this.imageUploader.ports.uploadImages.subscribe(this.readImages);
    this.imageUploader.ports.deleteImage.subscribe(this.props.onDelete);
  }

  componentWillUnmount() {
    this.imageUploader.ports.uploadImages.unsubscribe(this.readImages);
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
