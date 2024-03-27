import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  successMessage:string="";
  errMessage:string="";
  isSuccess:boolean=false;
  isError:boolean=false;
  
  

  
  isLoading:boolean = false;

  isForgetSuccess:boolean = false;
  isForgetError:boolean = false;

  isverfiySuccess:boolean = false;
  isVerfiyError:boolean = false;

  isNewPassSuccess:boolean = false;
  isNewPassError:boolean = false;


  
  errforgetMessage:string ="";
  successforgetMessage!:string;

  forgetFlag:boolean=true;
  verfiyFlag:boolean=false;
  newPassFlag:boolean=false;



  constructor(private _AuthService:AuthService , private _Router:Router ){}

  loginForm :FormGroup = new FormGroup({
   
    email : new FormControl(null ,[Validators.required , Validators.email]),
    password : new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Z].{6}/)]),
   

  })


  //  1 >>>>>>>>>>>>>>>>>>>
  forgetForm: FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email])
  })

  //  2 >>>>>>>>>>>>>>>>>>>
    resetCodeForm: FormGroup = new FormGroup({
      resetCode : new FormControl(null ,[Validators.required ])
  })

   //  3 >>>>>>>>>>>>>>>>>>>

   newPasswordForm: FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email]),
    newPassword : new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Z].{6}/)]),
  })

  loginSubmit(){

    this.isLoading =true;
    this._AuthService.loginApi(this.loginForm.value).subscribe({

      next :(res) => {
      
        this.isLoading =false;
        this.successMessage= res.message;
        this.isSuccess= true;
        this.isError = false;

        
      
        
        if(res.message == "success"){
          // 1-
          localStorage.setItem("userToken", res.token)
          console.log(res.message)
        //  2-
          this._AuthService.savaDataMethod();
          // 3-
            setTimeout(()=>{
          this._Router.navigate(['/home'])
        } , 2000)
       
          
        }
       




      },
      error :(err)=>{
       this.errMessage= err.error.message;
       this.isLoading =false;
       this.isError = true;
       this.isSuccess= false;
      

      },
      
    })









    
  }
  forgetSubmitPassword(){

    this.isLoading =true;

    this._AuthService.forgetPasswordApi(this.forgetForm.value).subscribe({

      next :(res) => {
        
        this.isLoading =false;
        if(res.message){
          this.isForgetError=false;
          this.isForgetSuccess=true;
          
          this.successforgetMessage= res.message;

          setTimeout(()=>{
            this.forgetFlag= false;
            this.verfiyFlag=true;
          } , 2000)
          

        }


      },
      error :(err)=>{
       this.errforgetMessage= err.error.message;
        this.isLoading =false;
      this.isForgetSuccess=false;
      this.isForgetError=true;
      console.log(err)
      

      },
      
    })

  }

  verfiySubmitPassword(){

    this.isLoading =true;
    console.log(this.resetCodeForm.value)

    this._AuthService.verfiyCodePasswordApi(this.resetCodeForm.value).subscribe({

      next :(res) => {
        this.isLoading =false;
        if(res.status == "Success"){

          this.isverfiySuccess=true;
          this.isVerfiyError=false;
          this.successforgetMessage= res.status;
          
          setTimeout(()=>{
            this.forgetFlag= false;
            this.verfiyFlag=false;
            this.newPassFlag=true;
          } , 2000)

        }


      },
      error :(err)=>{
      
      this.isLoading =false;
      this.errforgetMessage= err.error.message;
      this.isLoading =false;
      this.isverfiySuccess=false;
      this.isVerfiyError=true;
      console.log(err)
      

      },
      
    })

  }

  newPassordSubmitPassword(){

    this.isLoading =true;

    this._AuthService.newPasswordApi(this.newPasswordForm.value).subscribe({

      next :(res) => {
        this.isLoading =false;
        console.log(res);
        
        if(res.token){
          console.log("new.tmat")
          this.isNewPassSuccess=true;
          this.isNewPassError=false;
          this.successforgetMessage= res.statusMsg;


        }


      },
      error :(err)=>{
        this.isLoading =false;
      
        this.errforgetMessage= err.error.message;
        this.isLoading =false;
        this.isNewPassSuccess=false;
        this.isNewPassError=true;
      console.log(err)
      

      },
      
    })

  }


  

}
