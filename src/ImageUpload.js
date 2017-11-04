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

const IMAGE_UPLOADER_ID = 'file-upload';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.readImages = this.readImages.bind(this);
    this.setImageUploaderRef = this.setImageUploaderRef.bind(this);
  }

  componentDidMount() {
    this.imageUploader = Elm.ImageUpload.embed(this.imageUploaderRef, {
      id: IMAGE_UPLOADER_ID,
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

  readImages(images) {
    const element = document.getElementById(IMAGE_UPLOADER_ID);
    const files = Array.from(element.files);

    Promise.all(files.map(readImage))
      .then(this.props.onUpload);
  }

  setImageUploaderRef(node) {
    this.imageUploaderRef = node;
  }

  render() {
    return (
      <div ref={this.setImageUploaderRef} />
    );
  }
}

export default ImageUpload;
