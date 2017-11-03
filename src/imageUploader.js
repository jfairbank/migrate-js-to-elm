import cuid from 'cuid';
import { ImageUpload } from './ImageUpload.elm';

function uploadImage(file) {
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

export function create(node, options) {
  const app = ImageUpload.embed(node, options);

  function onUploadImages() {
    const element = document.getElementById(options.id);
    const files = Array.from(element.files);

    Promise.all(files.map(uploadImage))
      .then(options.onUpload);
  }

  app.ports.uploadImage.subscribe(onUploadImages);
  app.ports.deleteImage.subscribe(options.onDelete);

  return {
    setImages(images) {
      app.ports.receiveImages.send(images);
    },

    teardown() {
      app.ports.uploadImage.unsubscribe(onUploadImages);
      app.ports.deleteImage.unsubscribe(options.onDelete);
    },
  };
}
