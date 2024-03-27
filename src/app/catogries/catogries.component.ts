import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category, ProductsInterface } from '../products-interface';


@Component({
  selector: 'app-catogries',
  templateUrl: './catogries.component.html',
  styleUrls: ['./catogries.component.css']
})
export class CatogriesComponent implements OnInit{
  inputValue:string="";
  products:ProductsInterface[]=[];
  catogries:Category[]=[];
  constructor(private _ProductsService:ProductsService){}

  ngOnInit():void{
    localStorage.setItem("currentPage","/catogries")
    
    this._ProductsService.getCatogriesApi().subscribe({
      next:(res)=>{
         this.catogries = res.data;
         this.catogries=res.data;
        console.log(this.catogries)

      },
      error:(err)=>{
        console.log(err)

      }
    });

  }
  

}
