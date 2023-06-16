import { SocialAuthService } from '@abacritt/angularx-social-login';
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
    private fb:FormBuilder,
    private authService:SocialAuthService
    ) { }


    googleLogin(){
      // console.log("Hello from login function ");
      this.authService.authState.subscribe((user) => {
        // this.user = user;
        // this.loggedIn = (user != null);
        // console.log("Checking data of the user",user);
        localStorage.setItem('logged_in','true')
        this.Login.get('name').setValue(user.name);
        this.Login.get('email').setValue(user.email);
        this.Login.get('password').setValue(user.email);
        // console.log(this.nameForm);
        this.submit();
        
  
        // this.router.navigate(['/dashboard']);
      });
    }

  ngOnInit(): void {
    localStorage.setItem('selected','login');
    this.validation();
    this.googleLogin();
  }

  validation(){
    this.Login = this.fb.group({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required)
      
    })
  }
  submit(){
    this.Submit = true;
    setTimeout(()=>{
      this.Submit = false;
    },2000)
    if(this.Login.invalid){
      // console.log("Please fill your details to proceed");   
    }
    else{
    localStorage.setItem('email',this.Login.value.email);
    localStorage.setItem('password',this.Login.value.password);
    localStorage.setItem('name',this.Login.value.name);
    localStorage.setItem('logged_in','true');

    // console.log("Submitted");
    this.router.navigate(['/camera'])
    }
  }

}
