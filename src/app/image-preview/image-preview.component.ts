import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {

  /** Variable initialization */
  info = {
    image: undefined
  };
  uploadLogo = false;
  hideUploadedImage = true;
  imgSrc: string;

  constructor() { }

  /** Function on form submit */
  onSubmit(form: NgForm) {
    const formData = new FormData();
    let key;
    for (key in this.info) {
      if (this.info.hasOwnProperty(key)) {
        formData.append( key, this.info[key] );
      }
    }
    // Call some service or dispatch an action
  }

  /** Function to toggle upload logo option */
  onToggleLogoUpload(event: any) {
    this.uploadLogo = event.srcElement.checked;
    this.hideUploadedImage = true;
    this.info.image = undefined;
    this.imgSrc = '';
  }

  /** Function call to upload image */
  fileUploaded (event) {
    if (event.target.files.length > 0) {
      this.hideUploadedImage = false;
      this.info.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (fre: FileReaderEvent) => {
        this.imgSrc = fre.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.hideUploadedImage = true;
      this.info.image = undefined;
    }
  }

  /** Function to remove uploaded image */
  removeUploadedImage() {
    this.hideUploadedImage = true;
    this.info.image = undefined;
    this.imgSrc = '';
  }

}
