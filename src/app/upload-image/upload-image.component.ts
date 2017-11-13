import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Input() images: Array<any> = [];
  @Input() maximumImagesCount: any;
  @Output() resImage: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onRemove(i) {
    this.images.splice(i, 1);
    this.resImage.emit(this.images);
  }

  onUpload() {

    let options = {
      maximumImagesCount: this.maximumImagesCount,
      width: 900,
      quality: 30,
      outputType: 1
    };

    // this.imagePicker.getPictures(options).then((results) => {

    //   let loading = [];
    //   let loadingCount = 0;
    //   for (var i = 0; i < results.length; i++) {
    //     // loading.push(this.loading.create({
    //       content: 'Uploading... ' + (i + 1) + '/' + (results.length),
    //       cssClass: `loading-upload`,
    //       showBackdrop: false
    //     }));
    //     loading[i].present();
    //     this.uploadImage(results[i]).then((resUrl) => {
    //       this.images.push(resUrl);
    //       this.resImage.emit(this.images);
    //       loading[loadingCount].dismiss();
    //       loadingCount++;
    //     }, (error) => {
    //       loading[loadingCount].dismiss();
    //       loadingCount++;
    //       alert('Upload Fail. ' + JSON.stringify(error));
    //     })
    //   }

    // }, (err) => { });
  }

  uploadImage(imageString): Promise<any> {

    let storageRef = firebase.storage().ref();
    let filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
    let imageRef = storageRef.child(`images/${filename}.jpg`);
    let parseUpload: any;

    return new Promise((resolve, reject) => {
      parseUpload = imageRef.putString('data:image/jpeg;base64,' + imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (_snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot.downloadURL);
        });
    });
  }
}
