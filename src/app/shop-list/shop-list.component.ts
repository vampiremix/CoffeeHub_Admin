import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RouteService } from 'app/route.service';
import { ShopsModel } from 'app/shop-list/shop-list.model';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  public shoplist: Array<ShopsModel> = new Array<ShopsModel>();
  public editing: Array<ShopsModel> = new Array<ShopsModel>();
  public isEdit: Boolean = false;
  public isAdd: Boolean = false;
  public shopcode;
  public edittitle;
  public showSON = false;
  public shopowner;
  addShop: FormGroup;
  // public addData: any;
  public sendAddShopData: ShopsModel = new ShopsModel();
  constructor(private http: Http, private route: RouteService) {
    this.addShopStructure();

  }
  addShopStructure() {
    this.addShop = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      subdistrict: new FormControl(''),
      district: new FormControl(''),
      province: new FormControl(''),
      postcode: new FormControl(''),
      shopcode: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      lat: new FormControl(''),
      lng: new FormControl(''),
      open: new FormControl(''),
      close: new FormControl(''),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      line: new FormControl(''),
      parking: new FormControl(''),
      shopowner:new FormControl('')
    })
  }


  ngOnInit() {
    this.getShoplist();
    this.getShopowner();
  }

  getShoplist() {
    this.http.get(this.route.route + 'api/shops/').toPromise().then((res) => {
      this.shoplist = res.json();
      console.log(this.shoplist);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);

    });
  }
  getShopowner(){
    this.http.get(this.route.route + 'api/users/shopowner').toPromise().then((res) => {
      this.shopowner = res.json();
      console.log("Shop Owner " ,this.shopowner);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);

    });
  }

  addShopfn() {
    this.isAdd = true;
    this.isEdit = false;
    this.editing = null;


  }
  addShopData() {
    let token = this.route.createAuthorizationHeader();
    let user = JSON.parse(window.localStorage.getItem("user"));
    this.sendAddShopData.name = this.addShop.value.name;
    this.sendAddShopData.address.address = this.addShop.value.address;
    this.sendAddShopData.address.subdistrict = this.addShop.value.subdistrict;
    this.sendAddShopData.address.district = this.addShop.value.district;
    this.sendAddShopData.address.province = this.addShop.value.province;
    this.sendAddShopData.address.postcode = this.addShop.value.postcode;
    this.sendAddShopData.shopcode = this.addShop.value.shopcode;
    this.sendAddShopData.email = this.addShop.value.email;
    this.sendAddShopData.phone = this.addShop.value.phone;
    this.sendAddShopData.location.lat = this.addShop.value.lat;
    this.sendAddShopData.location.lng = this.addShop.value.lng;
    this.sendAddShopData.openinghours.open = this.addShop.value.open;
    this.sendAddShopData.openinghours.close = this.addShop.value.close;
    this.sendAddShopData.facebook = this.addShop.value.facebook;
    this.sendAddShopData.instagram = this.addShop.value.instagram;
    this.sendAddShopData.line = this.addShop.value.line;
    this.sendAddShopData.shopowner = this.addShop.value.shopowner;
    // this.sendAddShopData.parking = this.addShop.value.parking;
    this.sendAddShopData.createduser = user._id;
    console.log("ADD SHOP : ", this.sendAddShopData);
    if (this.sendAddShopData.name !== null && this.sendAddShopData.address.address !== null) {
      this.http.post(this.route.route + 'api/shops', this.sendAddShopData, { headers: token }).toPromise().then((res) => {
        this.getShoplist();
        this.addShop = new FormGroup({
          name: new FormControl(''),
          address: new FormControl(''),
          subdistrict: new FormControl(''),
          district: new FormControl(''),
          province: new FormControl(''),
          postcode: new FormControl(''),
          shopcode: new FormControl(''),
          email: new FormControl(''),
          phone: new FormControl(''),
          lat: new FormControl(''),
          lng: new FormControl(''),
          open: new FormControl(''),
          close: new FormControl(''),
          facebook: new FormControl(''),
          instagram: new FormControl(''),
          line: new FormControl(''),
          parking: new FormControl(''),
          shopowner:new FormControl('')
        });
        alert("Add Shop Complete !");
        // this.addShopStructure();
      });
    } else {
      alert("Please fill all data");
    }

  }
  editshop(shop) {
    this.isEdit = true;
    this.isAdd = false;
    this.edittitle = shop.name;
    this.shopcode = shop.shopcode;
    console.log("SHOP : ", shop);
    this.editing = JSON.parse(JSON.stringify(shop));
  }
  updateData(data) {
    let token = this.route.createAuthorizationHeader();
    let user = JSON.parse(window.localStorage.getItem("user"));
    data.editlog.user = user._id;
    this.http.put(this.route.route + 'api/shops/' + data._id, data, { headers: token }).toPromise().then((res) => {
      // this.shoplist = res.json();
      this.getShoplist();
      this.editing = null;
      this.isEdit = false;
      console.log(this.shoplist);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);

    });
  }


}
