import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public counter ;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    // this.getCartLength();
    this._dataService.currentMessage.subscribe(success => this.getCartLength());
  }

  getCartLength() {
    this.counter = this._dataService.updateNavCount();
  }

  

}
