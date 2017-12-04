import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RouteService } from '../route.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UsersModel } from 'app/user/user.model';

import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public loadingCtrl: boolean = true;
  headers = new Headers({
    'Content-Type': 'application/json'
  });
  datauser: UsersModel;
  optionsURL = new RequestOptions({
    headers: this.headers
  });

  login: FormGroup;
  userData: Array<UsersModel> = new Array<UsersModel>();
  public edit: Array<UsersModel> = new Array<UsersModel>();
  public edit1: UsersModel = new UsersModel();

  constructor(private http: Http, private route: RouteService) {

    this.login = new FormGroup({
      _id: new FormControl(this.edit1._id),
      username: new FormControl(this.edit1.username),
      firstName: new FormControl(this.edit1.firstName),
      lastName: new FormControl(this.edit1.lastName),
      email: new FormControl(this.edit1.email),
      phone: new FormControl(this.edit1.phone),
      profileImageURL: new FormControl(this.edit1.profileImageURL)

    });
  }

  ngOnInit() {
    this.getUserlist();
  }

  getUserlist() {
    let token = this.route.createAuthorizationHeader();
    this.http.get(this.route.route + 'api/users/', { headers: token }).toPromise().then((res) => {
      this.userData = res.json();
      this.loadingCtrl = false;
      console.log(this.userData);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);
    });
  }
  getDetailUser(item) {
    // alert(JSON.stringify(item));
    this.edit1 = JSON.parse(JSON.stringify(item));
    // alert(JSON.stringify(this.edit1))
    this.login = new FormGroup({
      _id: new FormControl(this.edit1._id),
      username: new FormControl(this.edit1.username),
      firstName: new FormControl(this.edit1.firstName),
      lastName: new FormControl(this.edit1.lastName),
      email: new FormControl(this.edit1.email),
      phone: new FormControl(this.edit1.phone),
      profileImageURL: new FormControl(this.edit1.profileImageURL)
    });
  }

  doLogin() {
    let userdata = { "username": this.login.value.username };
    alert(userdata);
  }
  updateData() {
    let token = this.route.createAuthorizationHeader();

    this.edit1.username = this.login.value.username;
    this.edit1.firstName = this.login.value.firstName;
    this.edit1.lastName = this.login.value.lastName,
      this.edit1.email = this.login.value.email,
      this.edit1.phone = this.login.value.phone,
      alert(JSON.stringify(this.edit1));

    this.http.put(this.route.route + 'api/users/' + this.edit1._id, this.edit1, { headers: token }).toPromise().then((res) => {
      // this.userData = res.json();
      console.log(this.userData);
      this.getUserlist();
    }).catch((err) => {
      console.log("Cannot get shop list :", err);
    });

  }

  seachItem(keyword) {
    let val = keyword;
    // alert("Event : " + keyword);
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.userData = this.userData.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val == '') {
      this.getUserlist();

    }
  }
}
