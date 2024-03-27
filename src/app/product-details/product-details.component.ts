import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { detailsProductInterface } from '../details-products';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  detailsProducts:any = {};
  productId:string="";
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService,
  private _CartService:CartService ,
  private _toastEvokeService: ToastEvokeService,
  private _Renderer2:Renderer2){}
  ngOnInit():void{
    

    this._ActivatedRoute.params.subscribe((p)=>{
      this.productId =p['productId'];
      console.log( this.productId)

    });

    this._ProductsService.getProductDetailsApi(this.productId).subscribe({
      next:(res)=>{
        
        this.detailsProducts = res.data;
        console.log(this.detailsProducts)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  addProductToCart(id:string , element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element ,'disabled' , 'true')
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._toastEvokeService.success('Succes!', res.message).subscribe();
        this._Renderer2.removeAttribute(element,'disabled')

         this._CartService.cartNum.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
        this._toastEvokeService.success('Failed!', err.message).subscribe();
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })

  }



  detailsProductOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
