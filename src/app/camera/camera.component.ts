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
export class CameraComponent implements OnInit,OnDestroy {
  video: any;
  person: number = 0;
  mediaStream:any;
  mediaRecorder: any;
  data: any = [];
  recording: any;
  stopButton: boolean = false;
  file:any;
  constructor(private dom: DomSanitizer,
    private api:APIService
    ) {

  }

  ngOnInit() {

    this.openCamea();
    this.detectFaces();


  }

  openCamea() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: any) => {
      this.video = document.getElementById('video');
      this.mediaStream = stream;
      this.video.srcObject = stream;
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = (e) => {
      // console.log("Recording stopped");
      let blob = new Blob(this.data, { type: 'video/mp4' })
      this.data = [];
      let recording = URL.createObjectURL(blob);
      this.recording = this.dom.bypassSecurityTrustUrl(recording);
      // console.log(this.recording);
      setTimeout(()=>{
        fetch(this.recording.changingThisBreaksApplicationSecurity).then(res => res.blob()).then(e => {
          console.log(e)
          this.file = e;
          let self = this;
          let reader = new FileReader()
          reader.onload = function(e){
            // console.log(e.target.result);
            let params = {
              url:e.target.result
            }
            self.api.postVideo('/recordedVideo?',params).subscribe((e:any)=>{
              // console.log(e);
              
            })
          }
          reader.onloadend = function(e){
            // console.log(e.target.result);
            
          }
          reader.readAsDataURL(self.file)
        });
      },2000)
      

      }
      this.mediaRecorder.ondataavailable = (e) => {
        this.data.push(e.data)
      }
    })
  }

  async detectFaces() {

    const model = await blazeface.load()
    setInterval(async () => {
      // console.log(this.recording);

      let detections = []
      const predictions = model.estimateFaces(this.video)
      if ((await predictions).length > 0) {
        for (let i = 0; i < (await predictions).length; i++) {
          if (((await predictions)[i].probability[0] * 100) > 5) {
            detections.push(await predictions[i])
          }
        }
      }
      this.person = detections.length;
    }, 25)
  }


  record() {
    this.mediaRecorder.start();
    this.stopButton = true;
    this.recording = undefined;
  }
  stop() {
    this.mediaRecorder.stop();
    this.stopButton = false;
  }
  handleInput(e:any){
    // console.log(e);
    const file = e.target.files[0];
    const self = this;
    let reader  = new FileReader()
    reader.onload = function(e){
      // console.log(e);
      let params = {
        url:e.target.result
      }
      self.api.postVideo('/recordedVideo?',params).subscribe((e:any)=>{
        // console.log(e);
        
      })
    }
    reader.readAsDataURL(file)
  }


  ngOnDestroy(): void {
      this.mediaStream.getTracks().forEach(element => {
        element.stop()
        if(this.stopButton){
          this.stop()
        }
      });
  }
}
