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
  public shoplist: Array<ShopsModel> = new Array<ShopsModel>();
  public editing: ShopsModel = new ShopsModel();
  public isEdit : Boolean = false;
  public shopcode;
  public edittitle;
  public bindingData : ShopsModel = new ShopsModel();
  constructor(private http: Http, private route: RouteService) { }

  ngOnInit() {
    this.getShoplist();
  }

  getShoplist() {
    this.http.get(this.route.route + 'api/shops/').toPromise().then((res) => {
      this.shoplist = res.json();
      console.log(this.shoplist);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);

    });
  }

  editshop(shop) {
    this.isEdit = true;
    this.edittitle = shop.name;
    this.shopcode = shop.shopcode;
    this.bindingData = shop;
    alert("time :" + this.bindingData.openinghours.open);
    this.editing = JSON.parse(JSON.stringify(shop));
    console.log("shop edit : " , this.editing);
  }
  updateData(data){
    this.http.put(this.route.route + 'api/shops/' + data._id, data, ).toPromise().then((res) => {
      this.shoplist = res.json();
      console.log(this.shoplist);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);

    });
  }
}
