import { Component, OnInit } from '@angular/core';
import { Brand } from '../products-interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit  {
  inputValue:string="";
  constructor(private _ProductsService:ProductsService){}

  brands:Brand[]=[];


  ngOnInit():void{
    localStorage.setItem("currentPage","/brand");

    this._ProductsService.getBrandsApi().subscribe({
      next:(res)=>{
         this.brands = res.data;
         this.brands=res.data;
        console.log(this.brands)

      },
      error:(err)=>{
        console.log(err)

      }
    });

  }

}
