import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { promisify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products : Product[] = [];
  filteredProducts : Product[] = []
  loaded = true;
  
  constructor( private http : HttpClient  ) { 

    this.loadProduct();

  }

  private loadProduct(){

    return new Promise((resolv, reject) =>{
      
      this.http.get('https://anisbakery-51672.firebaseio.com/products_idx.json')
      .subscribe((resp: Product[]) =>{
         
          this.products = resp;
          this.loaded = false;
          resolv();
      });
    });

  }

  public getProduct( id: String ){

    return this.http.get(`https://anisbakery-51672.firebaseio.com/products/${id}.json`);

  }

  public searchProducts( term: string ){

    if(this.products.length == 0){
      //load products
      this.loadProduct().then( ()=>{

        this.filterProduct(term);
      });
    }else{
      //apply filtered
      this.filterProduct(term);
    }

  }


  public filterProduct( term: string ){
    this.filteredProducts = [];
    term = term.toLocaleLowerCase();
    this.products.forEach( ( prod )=>{

      const tituloLower = prod.titulo.toLocaleLowerCase();
      const categoriaLower = prod.categoria.toLocaleLowerCase();

      if(categoriaLower.indexOf(term) >= 0 || tituloLower.indexOf(term) >= 0){
        this.filteredProducts.push(prod);
      }

    });
  }

}
