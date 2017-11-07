import React, { Component } from 'react';
import Elm from './ImageUpload.elm';
import './ImageUpload.css';

const IMAGE_UPLOADER_ID = 'file-upload';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.setElmRef = this.setElmRef.bind(this);
    this.readImages = this.readImages.bind(this);
  }

  componentDidMount() {
    this.elm = Elm.ImageUpload.embed(this.elmRef, {
      imageUploaderId: IMAGE_UPLOADER_ID,
      images: this.props.images,
    });

    this.elm.ports.uploadImages.subscribe(this.readImages);
  }

  componentWillUnmount() {
    this.elm.ports.uploadImages.unsubscribe(this.readImages);
  }

  componentWillReceiveProps(nextProps) {
    this.elm.ports.receiveImages.send(nextProps.images);
  }

  readImage(file) {
    const reader = new FileReader();

    const promise = new Promise((resolve) => {
      reader.onload = (e) => {
        resolve({
          url: e.target.result,
        });
      };
    });

    reader.readAsDataURL(file);

    return promise;
  }

  readImages() {
    const element = document.getElementById(IMAGE_UPLOADER_ID);
    const files = Array.from(element.files);

    Promise.all(files.map(this.readImage))
      .then(this.props.onUpload);
  }

  setElmRef(node) {
    this.elmRef = node;
  }

  render() {
    return (
      <div ref={this.setElmRef} />
    );
  }
}

export default ImageUpload;
