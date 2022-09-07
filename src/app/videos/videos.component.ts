import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
videos:any = [];
  constructor(private api:APIService) { }

  ngOnInit(): void {

    this.api.getRecordings('/recordings').subscribe((data:any) =>{
      // console.log(data);
      this.videos = data.response;
    })
  }

}
