import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cartId:string|null  ='';
  
  isLoading:boolean = false;
  constructor(private _AuthService:AuthService , private _Router:Router , private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService ){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
       this.cartId= param.get('cartId');
       console.log(this.cartId)

      }

    })
    
  }

  checkOutForm :FormGroup = new FormGroup({
   
    details : new FormControl(null ,[Validators.required ]),
    phone : new FormControl(null, [Validators.required ,Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city : new FormControl(null ,[Validators.required ])

  })

  chechOutSubmit(){
    this._CartService.checkout(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        this.isLoading=true;
        console.log(res)
        if(res.status == "success"){

          setTimeout(()=>{
            window.open(res.session.url,'_self')

          } , 2000)
      

        }
         


      },
      error:(err)=>{
        this.isLoading=true;
        console.log(err)
      }
 
    })
  }


}
