import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDescription } from 'src/app/interfaces/product-description.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  product: ProductDescription;
  loaded = true;
  constructor( private routes: ActivatedRoute,  public _products : ProductsService ) { }

  ngOnInit(): void {

    this.routes.params
        .subscribe( param =>{
            this._products.getProduct( param['id'] )
              .subscribe((product: ProductDescription) =>{
                this.product = product;
                this.loaded = false;
              });
        } );

  }

}
