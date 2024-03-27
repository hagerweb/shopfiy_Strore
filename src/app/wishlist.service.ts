import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseURL:string ="https://ecommerce.routemisr.com";
   
  myToken:any ={
    token:localStorage.getItem('userToken')
  }


  constructor(private _HttpClient:HttpClient) { }
  addToWhisList(prodId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`,
   {
     productId:prodId
    },
    {
      headers:this.myToken
    }
    )

  }


  getWishListUser():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`,{
      headers:this.myToken
    })

    

  }

  removeItemWishList(prodtId:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${prodtId}`,{
      headers:this.myToken
    })

    

  }
}
