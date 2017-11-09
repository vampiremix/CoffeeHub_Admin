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
  headers = new Headers({
    'Content-Type': 'application/json'
  });
  datauser: UsersModel;
  optionsURL = new RequestOptions({
    headers: this.headers
  });
  userData: UsersModel = new UsersModel();

  constructor(private http: Http, private route: RouteService) {

  }

  ngOnInit() {
    this.getShoplist();
  }

  getShoplist() {
    this.http.get(this.route.route + 'api/users/').toPromise().then((res) => {
      this.userData = res.json();
      console.log(this.userData);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);

    });
  }
}
