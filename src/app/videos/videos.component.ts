import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
videos:any = [];
  constructor(private api:APIService, private dialog:MatDialog) { }

  ngOnInit(): void {
    localStorage.setItem('selected','videos');
    this.api.getRecordings('/recordings').subscribe((data:any) =>{
      console.log(data);
      this.videos = data.response;
    })
  }

  watchVideo(data:any){
    console.log(data)
    const params = {id:data._id};
    this.api.selectedUserRecording(`/selectedRecording?id=${params.id}`).subscribe((next:any)=>{
      console.log(next);
      this.dialog.open(watchVideoComponent,{
       
      })
    })
  }

}


@Component({
  selector : 'app-videos',
  templateUrl : './watchVideo.html',
  styleUrls : ['./videos.component.scss']
})

export class watchVideoComponent implements OnInit {
   
  constructor(){

  }  
  ngOnInit(): void {
      console.log("Hello from watchVideo");
      
  }
}