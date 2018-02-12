import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import { Product } from '../../models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public cart = [];
  public total: number = 0;
  public added: boolean = false;

  products: Product[];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getProducts().subscribe(products => {
      // console.log(products);
      this.products = products['products'];
      // console.log(this.products);
      this.products.forEach((cur, index) => {
        // console.log(cur.price);
        let n = cur.price;
        let l = n.toString().length-2;
        let v: number = n/Math.pow(10, l);
        cur.price = v;
        // console.log(cur.price);
        // console.log(this.products);
      })

    })
  }

  addItem(product) {
    this.products.forEach((cur, index) => {
      if (cur === product) {
        // console.log(this.cart.includes(cur));
        this.cart.push(product);
        // console.log(this.cart.includes(cur));
        this.total += cur.price;
        this.added = true;
        this.updateCartCount();
      }
    })
  }

  deleteItem(product) {
    this.cart.forEach((cur, index) => {
      if (cur === product) {
        this.cart.splice(index, 1);
        this.total -= cur.price;
        this.updateCartDelete();
      }

      if(this.cart.length == 0) {
        this.added = false;
      }
    });
  }

  updateCartCount() {
    this._dataService.updateCartCount('Updating Cart Count');
  }

  updateCartDelete() {
    this._dataService.updateCartDelete('Updating Cart Count');
  }

}
