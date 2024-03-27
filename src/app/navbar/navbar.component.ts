import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartNumber?:number;
  isLogin:boolean = false ;
  isSocial:boolean = true ;

  constructor(private _AuthService:AuthService , private _Router:Router, private _CartService:CartService){}
  ngOnInit():void{
       this._AuthService.userDataVar.subscribe(()=>{
        if(this._AuthService.userDataVar.getValue()==null){
          this.isLogin=false;
          this.isSocial=true;
        }else{
          this.isLogin=true;
         
          setTimeout(()=>{
            this.isSocial=false;
          } , 2000)
        }

       })

       this._CartService.cartNum.subscribe({
        next:(data)=>{
          this.cartNumber=data;
          console.log(this.cartNumber)

        }
       })
       this._CartService.getCardUser().subscribe({
        next:(res)=>{
          this.cartNumber=res.numOfCartItems
          

        }

       })





  }

  logOut(){
    // 1- remove userToken 
    localStorage.removeItem("userToken");

    // 2- user DataVar = Null >> call to savaDataMethod
    this._AuthService.savaDataMethod();

    // Route to Login Page
    this._Router.navigate(['/login']);


  }
  

}
