import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './products-interface';

@Pipe({
  name: 'searchcat'
})
export class SearchcatPipe implements PipeTransform {

  transform(allProducts: Category[], userWord: string): Category[] {
    return allProducts.filter((onProd)=> onProd.name.toLowerCase().includes(userWord.toLowerCase())) ;
  }


}
