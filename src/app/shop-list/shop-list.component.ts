import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RouteService } from 'app/route.service';
import { ShopsModel } from 'app/shop-list/shop-list.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadModule } from 'primeng/primeng';
import { Message } from '../../../node_modules/primeng/components/common/api';
import { NotificationsComponent } from 'app/notifications/notifications.component';


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})

export class ShopListComponent implements OnInit {
  public shoplist: Array<ShopsModel> = new Array<ShopsModel>();
  public editing: ShopsModel = new ShopsModel();
  public isEdit: Boolean = false;
  public isAdd: Boolean = false;
  public shopcode;
  public edittitle;
  public showSON = false;
  public getshopowner;
  addShop: FormGroup;
  // public addData: any;

  selectedCar: string;
  parkingOpt;
  //cars: SelectItem[];

  msgs: Message[];
  uploadedFiles: any[] = [];

  public sendAddShopData: ShopsModel = new ShopsModel();
  constructor(private http: Http,
    private route: RouteService,
    private fileUploadModule: FileUploadModule,
    public notify: NotificationsComponent
  ) {
    this.addShopStructure();

    this.parkingOpt = [
      { label: 'มีที่จอดรถ', value: 'have' },
      { label: 'ไม่มีที่จอดรถ', value: 'nothave' },
      { label: 'จอดรถข้างทาง', value: 'ontheroad' }
    ];
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
      shopowner: new FormControl(null)
    })
  }
  ngOnInit() {
    this.getShoplist();
    this.getShopowner();

  }

  getShoplist() {
    let token = this.route.createAuthorizationHeader();
    this.http.get(this.route.route + 'api/shops/', { headers: token }).toPromise().then((res) => {
      this.shoplist = res.json();
      console.log(this.shoplist);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);

    });
  }
  getShopowner() {
    let token = this.route.createAuthorizationHeader();
    this.http.get(this.route.route + 'api/users/shopowner', { headers: token }).toPromise().then((res) => {
      this.getshopowner = res.json();
      console.log("Shop Owner ", this.getshopowner);
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
    this.sendAddShopData.parking = this.addShop.value.parking;
    this.sendAddShopData.createduser = user._id;
    console.log("ADD SHOP : ", this.sendAddShopData);
    if (this.sendAddShopData.name !== null && this.sendAddShopData.address.address !== null && this.sendAddShopData.parking !== null && this.sendAddShopData.parking !== "") {
      this.http.post(this.route.route + 'api/shops', this.sendAddShopData, { headers: token }).toPromise().then((res) => {
        this.notify.showNotification('top', 'right', 'Add Shop finish.', 2);
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
          shopowner: new FormControl('')
        });
      });
    } else {
      this.notify.showNotification('top', 'right', 'Please fill all required information.', 4);
    }

  }
  editshop(shop) {
    if (this.isEdit == true) {
      this.editing = null;
    }
    this.getShopowner();
    this.isEdit = true;
    this.isAdd = false;
    this.edittitle = shop.name;
    this.shopcode = shop.shopcode;
    console.log("SHOP : ", shop);
    this.editing = JSON.parse(JSON.stringify(shop));
    this.editing.openinghours.open = this.editing.openinghours.open ? new Date(this.editing.openinghours.open) : new Date();
    this.editing.openinghours.close = this.editing.openinghours.close ? new Date(this.editing.openinghours.close) : new Date();
    console.log("TIME : ", this.editing[0].openinghours.open);
  }
  updateData(data) {
    let token = this.route.createAuthorizationHeader();
    let user = JSON.parse(window.localStorage.getItem("user"));
    // data.openinghours.open = new Date(Date.parse(data.openinghours.open));
    // data.openinghours.close = new Date(Date.parse(data.openinghours.close));
    data.editlog.user = user._id;
    this.http.put(this.route.route + 'api/shops/' + data._id, data, { headers: token }).toPromise().then((res) => {
      // this.shoplist = res.json();
      this.notify.showNotification('top', 'right', 'Edit Shop information complete.', 2);
      this.getShoplist();
      this.editing = null;
      this.isEdit = false;
      console.log(this.shoplist);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);
      this.notify.showNotification('top', 'right', 'Error on editing shop information : ' + err, 4);
    });
  }

  seachItem(keyword) {
    let val = keyword;
    // alert("Event : " + keyword);
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.shoplist = this.shoplist.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val == '') {
      this.getShoplist();


    }
  }

  onUpload(event) {
    alert("ssssssss");
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles);
    }

    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}