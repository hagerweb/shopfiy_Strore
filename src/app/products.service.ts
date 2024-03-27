import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, isObservable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseURL:string ="https://ecommerce.routemisr.com";

  constructor(private _HttpClient:HttpClient) { }

  getProductsApi():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/products`)

  }

  getCatogriesApi():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories`)

  }

  getBrandsApi():Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands`)

  }


  getProductDetailsApi(productId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/products/${productId}`)

  }


  getCatogryDetailsApi(catogryId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories/${catogryId}`)

  }

  getBrandsDetailsApi(brandId:string):Observable<any>{
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands/${brandId}`)

  }
}
