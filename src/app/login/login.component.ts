import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Login:FormGroup;
  Submit:boolean  =false;
  constructor(private router:Router,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    localStorage.setItem('selected','login');
    this.validation()
  }

  validation(){
    this.Login = this.fb.group({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',Validators.required)
    })
  }
  submit(){
    this.Submit = true;
    setTimeout(()=>{
      this.Submit = false;
    },2000)
    if(this.Login.invalid){
      console.log("Please fill your details to proceed");   
    }
    else{

    localStorage.setItem('email',this.Login.value.email);
    localStorage.setItem('password',this.Login.value.password);

    console.log("Submitted");
    this.router.navigate(['/dashboard'])
    }
  }

}
