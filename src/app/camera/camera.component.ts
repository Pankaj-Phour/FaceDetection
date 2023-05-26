import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as blazeface from '@tensorflow-models/blazeface'
import '@tensorflow/tfjs-backend-webgl'
import { APIService } from '../api.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {
  video: any;
  person: number = 0;
  mediaStream: any;
  mediaRecorder: any;
  data: any = [];
  recording: any;
  stopButton: boolean = false;
  file: any;
  constructor(private dom: DomSanitizer,
    private api: APIService
  ) {}

  ngOnInit() {
    localStorage.setItem('selected', 'camera');
    this.openCamea();
    this.detectFaces();
  }

  // Function to load web cam of the user 
  openCamea() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: any) => {
      this.video = document.getElementById('video');
      this.mediaStream = stream;
      this.video.srcObject = stream;
      this.mediaRecorder = new MediaRecorder(stream);

      // When we stop the recording this code block gets called automatically 
      this.mediaRecorder.onstop = (e) => {
        let blob = new Blob(this.data, { type: 'video/mp4' })
        this.data = [];
        let recording = URL.createObjectURL(blob);
        this.recording = this.dom.bypassSecurityTrustUrl(recording);
        setTimeout(() => {
          fetch(this.recording.changingThisBreaksApplicationSecurity).then(res => res.blob()).then(e => {
            this.file = e;
            let self = this;
            let reader = new FileReader()
            reader.onload = function (e) {
              const video = <HTMLVideoElement>document.getElementById('video');
              const thumb = self.captureNew(video);
              let params = {
                url: e.target.result,
                thumbnail: thumb.toDataURL(),
                name : localStorage.getItem('name')
              }
              self.api.postVideo('/recordedVideo', params).subscribe(() => { })
            }
            reader.readAsDataURL(self.file)
          });
        }, 2000)
      }
      this.mediaRecorder.ondataavailable = (e) => {
        this.data.push(e.data)
      }
    })
  }

  // Function helps to detect faces in the user's web cam (Here we are using blazeface model to detect faces)
  async detectFaces() {
    const model = await blazeface.load()
    setInterval(async () => {
      let detections = []
      if (this.video) {
        const predictions = model.estimateFaces(this.video)
        if ((await predictions).length > 0) {
          for (let i = 0; i < (await predictions).length; i++) {
            if (((await predictions)[i].probability[0] * 100) > 5) {
              detections.push(await predictions[i])
            }
          }
        }
        this.person = detections.length;
      }
    }, 25)
  }


  // Function hits when we start the recording 
  record() {
    this.mediaRecorder.start();
    this.stopButton = true;
    this.recording = undefined;
  }

  // Function hits when we stop the recording 
  stop() {
    this.mediaRecorder.stop();
    this.stopButton = false;
  }


  // Function hits when this component is destroyed from the viewport 
  ngOnDestroy(): void {
    this.mediaStream.getTracks().forEach(element => {
      element.stop()
      if (this.stopButton) {
        this.stop()
      }
    });
  }

  // Function to generate thumbnail of the user's video 
  captureNew(video: any) {
    // const w = video.videoWidth;
    // const h = video.videoHeight;
    let w = 300;
    let h = 200;
    const canvas = document.createElement("canvas");
    canvas["width"] = w;
    canvas["height"] = h;
    const ctx = canvas["getContext"]("2d");
    ctx.drawImage(video, 0, 0, w, h);
    return canvas as HTMLCanvasElement;
  }


  // This function was used when we are uploading a file (to backend) from our system storage and not a webcam video 
  handleInput(e: any) {
    const file = e.target.files[0];
    const self = this;
    let reader = new FileReader()
    reader.onload = function (e) {
      let params = {
        url: e.target.result
      }
      self.api.postVideo('/recordedVideo?', params).subscribe(() => { })
    }
    reader.readAsDataURL(file)
  }
}
