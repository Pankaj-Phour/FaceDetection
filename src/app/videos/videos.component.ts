import { Component, Inject, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
videos:any = [];
loader:boolean = false;
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
    this.loader = true;
    this.api.selectedUserRecording(`/selectedRecording?id=${params.id}`).subscribe((next:any)=>{
      this.loader = false
      console.log(next);
      this.dialog.open(watchVideoComponent,{
       data : next.response
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
   
  constructor(@Inject(MAT_DIALOG_DATA) public data){

  }  
  ngOnInit(): void {
      console.log("Hello from watchVideo",this.data);
      
  }
}