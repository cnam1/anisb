import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 

  constructor( private route: ActivatedRoute,
               private router: Router,
               public _products: ProductsService ) { }

  ngOnInit(): void {

    this.route.params.subscribe( params =>{

      this._products.searchProducts(params['term']);
      if(this._products.filteredProducts.length == 0){
        Swal.fire({
          allowOutsideClick: false,
          text: 'No se encontraron resultados.',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/home');
          } 
        });
      }
    });
  }

}
