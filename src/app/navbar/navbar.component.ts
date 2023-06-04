import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,DoCheck {
  search:FormGroup;
  dashboard:boolean = false;
  selected:any = 'login';
  constructor(private api:APIService) { }

  ngOnInit(): void {
    this.validation();
    this.api.dashboard$.subscribe((e:any)=>{
      // console.log(e);
      if(e===true){
        this.dashboard = true;
      }
      else{
        this.dashboard = false;
      }
    })
    if(localStorage.getItem('selected')){
      this.selected = localStorage.getItem('selected')
    }
    
  }

  validation(){
    this.search = new FormGroup({
      name: new FormControl('',Validators.required)
    })
  }

  input(e:any){
    this.api.input.next(e.target.value)
  }

  ngDoCheck(): void {
    if(localStorage.getItem('selected')){
      this.selected = localStorage.getItem('selected')
    }
  }
}
