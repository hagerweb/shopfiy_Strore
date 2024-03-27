import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.css']
})
export class BrandsDetailsComponent {
  detailsBrand:any = {};
  brandId:string="";
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService){}
  ngOnInit():void{
    

    this._ActivatedRoute.params.subscribe((p)=>{
      this.brandId =p['brandId'];
      console.log( this.brandId)

    });

    this._ProductsService.getBrandsDetailsApi(this.brandId).subscribe({
      next:(res)=>{
        
        this.detailsBrand = res.data;
        console.log(this.detailsBrand)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

}
