import { Component, Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';
import { Category, ProductsInterface } from '../products-interface';


@Component({
  selector: 'app-whis-list',
  templateUrl: './whis-list.component.html',
  styleUrls: ['./whis-list.component.css']
})
export class WhisListComponent {
  inputValue:string="";
  products:ProductsInterface[]=[];
  catogries:Category[]=[];
  wishListData:string[]=[];


  constructor(
    private _ProductsService:ProductsService,private _WishlistService:WishlistService,
    private _toastEvokeService: ToastEvokeService,
    private _Renderer2:Renderer2,
    private _CartService:CartService
  
    ){}

    
  ngOnInit():void{
    localStorage.setItem("currentPage","/products");
    this._WishlistService.getWishListUser().subscribe({
      next:(res)=>{
        const newData = res.data.map((item:any)=> item._id)
        this.wishListData = newData

        
      },
      error:(err)=>{
        console.log(err)
      }
    })

    this._WishlistService.getWishListUser().subscribe({
      next:(res)=>{
        this.products = res.data;

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
  
  

 

}
