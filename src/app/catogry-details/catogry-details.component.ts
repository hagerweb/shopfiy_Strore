import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-catogry-details',
  templateUrl: './catogry-details.component.html',
  styleUrls: ['./catogry-details.component.css']
})
export class CatogryDetailsComponent {
  detailsCatogry:any = {};
  catogryId:string="";
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService){}
  ngOnInit():void{
    

    this._ActivatedRoute.params.subscribe((p)=>{
      this.catogryId =p['catogryId'];
      console.log( this.catogryId)

    });

    this._ProductsService.getCatogryDetailsApi(this.catogryId).subscribe({
      next:(res)=>{
        
        this.detailsCatogry = res.data;
        console.log(this.detailsCatogry)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

}
