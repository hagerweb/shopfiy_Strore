import { Pipe, PipeTransform } from '@angular/core';
import { ProductsInterface } from './products-interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts: ProductsInterface[], userWord: string): ProductsInterface[] {
    return allProducts.filter((onProd)=> onProd.title.toLowerCase().includes(userWord.toLowerCase())) ;
  }

}
