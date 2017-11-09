import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RouteService } from 'app/route.service';
import { ShopsModel } from 'app/shop-list/shop-list.model';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  public shoplist: ShopsModel = new ShopsModel;
  constructor(private http: Http, private route: RouteService) { }

  ngOnInit() {
    this.getShoplist();
  }


  getShoplist() {
    this.http.get(this.route.route + 'api/shops/').toPromise().then((res) => {
      this.shoplist = res.json();
      console.log(this.shoplist);
    }).catch((err) => {
     console.log("Cannot get shop list :" , err);
   
    });
  }
}
