import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category, ProductsInterface } from '../products-interface';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  inputValue:string="";
  constructor(
  private _ProductsService:ProductsService,private _CartService:CartService ,
  private _toastEvokeService: ToastEvokeService,
  private _Renderer2:Renderer2,private  _WishlistService:WishlistService,

  ){}
  products:ProductsInterface[]=[];
  catogries:Category[]=[];
  wishListData:string[]=[];

  ngOnInit():void{
    localStorage.setItem("currentPage","/home");
    
    this._WishlistService.getWishListUser().subscribe({
      next:(res)=>{
        const newData = res.data.map((item:any)=> item._id)
        this.wishListData = newData

        
      },
      error:(err)=>{
        console.log(err)
      }
    })



    this._ProductsService.getProductsApi().subscribe({
      next:(res)=>{
        this.products = res.data;

      },
      error:(err)=>{
        console.log(err)

      }
    });



    this._ProductsService.getCatogriesApi().subscribe({
      next:(res)=>{
         this.catogries = res.data;
        // console.log(res.data)

      },
      error:(err)=>{
        console.log(err)

      }
    });

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


  addProductToWishListt(id:string ):void{
    // this._Renderer2.setAttribute(element ,'disabled' , 'true')
    this._WishlistService.addToWhisList(id).subscribe({
      next:(res)=>{
        this.wishListData=res.data;
        console.log(this.wishListData);
        console.log(res)
        this._toastEvokeService.success('Succes!', res.message).subscribe();
        // this._Renderer2.removeAttribute(element,'disabled')
       

        
      },
      error:(err)=>{
        console.log(err)
        this._toastEvokeService.success('Failed!', err.message).subscribe();
        // this._Renderer2.removeAttribute(element,'disabled')
      }
    })

  }

  removeItemWishList(productId:string):void{
  
    this._WishlistService.removeItemWishList(productId).subscribe({
      next:(res)=>{
        this.wishListData=res.data;
        console.log(this.wishListData);

        this._toastEvokeService.danger('Succes!', res.message).subscribe();
        console.log(res.data)
        this.addProductToWishListt;
       

        
        
      },
      error:(err)=>{
        
        console.log(err)
      }
    })
  }


  catogriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navSpeed: 700,
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
