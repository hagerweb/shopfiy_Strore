import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{
  cartDetails:any =null
  constructor(private _CartService:CartService ,private _Renderer2:Renderer2){}
  
  ngOnInit():void{
    localStorage.setItem("currentPage","/cart");
    this._CartService.getCardUser().subscribe({

      next:(res)=>{
       
        this.cartDetails = res.data
        console.log(res.data)
        

      },
      error:(err)=>{
        console.log(err)
      }
    })


  }
  removeItem(productId:string ,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element ,'disabled' , 'true')
    this._CartService.removeItemCart(productId).subscribe({
      next:(res)=>{
        this._Renderer2.removeAttribute(element,'disabled')
        
        this._CartService.cartNum.next(res.numOfCartItems)
        console.log(res)
        this.cartDetails = res.data
        
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
        console.log(err)
      }
    })
  }

  changeCount(count:number ,productId:string ,element1:HTMLButtonElement,element2:HTMLButtonElement):void{
    this._Renderer2.removeAttribute(element1,'disabled')
    this._Renderer2.removeAttribute(element2,'disabled')
    if(count>=1){
      this._CartService.updateCountProduct(productId,count).subscribe({
        next:(res)=>{
          console.log(res)
          this.cartDetails = res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
      

    }
    else{
      this._CartService.removeItemCart(productId).subscribe({
        next:(res)=>{
          this._Renderer2.removeAttribute(element1,'disabled')
          this._Renderer2.removeAttribute(element2,'disabled')
          
          console.log(res)
          this.cartDetails = res.data
          
        },
        error:(err)=>{
          this._Renderer2.removeAttribute(element1,'disabled')
          this._Renderer2.removeAttribute(element2,'disabled')
          
          console.log(err)
        }
      })

    }



   
  }


  clearItems(element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element ,'disabled' , 'true')
    this._CartService.clearAllCart().subscribe({
      next:(res)=>{
        this._Renderer2.removeAttribute(element,'disabled')
        console.log(res)
        this.cartDetails = res.data
        
        this._CartService.cartNum.next(res.numOfCartItems)
        
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
        console.log(err)
      }
    })
  }


}
