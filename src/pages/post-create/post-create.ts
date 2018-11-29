import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera} from '@ionic-native/camera';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {Posts} from '../../providers';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'post-create.html'
})
export class PostCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;


  form: FormGroup;

  constructor(private storage: Storage,
              public postsq: Posts, public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera,
  ) {
    this.form = formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      topic: [''],
      content: [''],
      profilePicture: ['']
    });


    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({'profilePic': 'data:image/jpg;base64,' + data});
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({'profilePic': imageData});
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the post, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) {
      return;
    }
    this.storage.get('response').then((val) => {
      console.log(val);
      let info = {
        user_id: val.user.user_id,
        title: this.form.value.title,
        description: this.form.value.description,
        topic: this.form.value.topic,
        content: this.form.value.content
      };

      this.postsq.post(info).subscribe((res: any) => {
        if (res.success == true) {
          console.log("Success: ", res);
        } else {
          console.log("Errored: ", res)
        }
      }, (err) => {
        console.log("Errored", err)
      });
      this.viewCtrl.dismiss(this.form.value);
    });

  }
}
