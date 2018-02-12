import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// HttpClient returns the Observable
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../models/Product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class DataService {
  productsUrl: string = '../../assets/products.json';
  products: Product[];
  cart_counter: number = 0;
  data: Observable<any>

  private message = new BehaviorSubject<string>("cart initialized");
  currentMessage = this.message.asObservable();

  constructor(private _http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this._http.get<Product[]>(this.productsUrl);
  }

  saveProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this.productsUrl, product, httpOptions);
  }

  updateCartCount(message:string) {
    this.cart_counter++;
    // console.log(this.cart_counter);
    this.message.next(message);
  }

  updateCartDelete(message:string) {
    this.cart_counter--;
    this.message.next(message);
  }

  updateNavCount(){
    return this.cart_counter;
  }


  
}
