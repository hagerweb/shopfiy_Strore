import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNum:BehaviorSubject<number> =new BehaviorSubject(0);
  
  myToken:any ={
    token:localStorage.getItem('userToken')
  }
  baseURL:string ="https://ecommerce.routemisr.com";

  constructor(private _HttpClient:HttpClient) { }
  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/cart`,
   {
     productId:prodId
    },
    {
      headers:this.myToken
    }
    )

  }
  getCardUser():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`,{
      headers:this.myToken
    })

    

  }
  
  removeItemCart(prodtId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${prodtId}`,{
      headers:this.myToken
    })

    

  }
  updateCountProduct(prodtId:string , countNum:number):Observable<any>{
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${prodtId}`,
    {
      count:countNum
    }
    ,{
      headers:this.myToken
    })

    

  }


  clearAllCart():Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`,{
      headers:this.myToken
    })

    

  }

  checkout(cartId:string|null, orderInfo:object):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress: orderInfo
        
        
    },
    {
      headers:this.myToken
    }


    )
  }


  

}
