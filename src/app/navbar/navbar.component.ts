import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,DoCheck {
  search:FormGroup;
  dashboard:boolean = false;
  selected:any = 'login';
  nav:any;
burger:any;
navOpen:boolean = false;

  constructor(private api:APIService,private router:Router) { }

  ngOnInit(): void {

    this.burger = document.getElementById('burger');
    this.nav    = document.getElementById('main-nav');

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

  toggleNav(){
    console.log("Hello from toggle nav");
    setTimeout(() => {
      
      this.navOpen = !this.navOpen;
    }, 100);
    // this.classList.toggle('is-open');
    this.nav.classList.toggle('is-open');
  }

  reload(){
    // window.location.reload();
  
    this.router.navigate(['/'])
  }
}
