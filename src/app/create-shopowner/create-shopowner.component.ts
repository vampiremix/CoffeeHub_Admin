import { RouteService } from '../route.service';
import { Http } from '@angular/http';
import { UsersModel } from '../user/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-shopowner',
  templateUrl: './create-shopowner.component.html',
  styleUrls: ['./create-shopowner.component.css']
})
export class CreateShopownerComponent implements OnInit {

  login: FormGroup;
  public edit1: UsersModel = new UsersModel();

  constructor(private http: Http, private route: RouteService) {
    
    this.login = new FormGroup({
      
      username: new FormControl(''),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')

    });
   }

  ngOnInit() {
  }

  postDataShopOwner(){
    let token =  this.route.createAuthorizationHeader();

    this.edit1.username = this.login.value.username;
    this.edit1.password = this.login.value.password;
    this.edit1.firstName = this.login.value.firstName;
    this.edit1.lastName = this.login.value.lastName;
    this.edit1.email = this.login.value.email;
    this.edit1.phone = this.login.value.phone;
    this.edit1.roles = ['shopowner'];

    alert(JSON.stringify(this.edit1));

    this.http.post(this.route.route + 'api/auth/signup/', this.edit1).toPromise().then((res) => {
     console.log(res);
    }).catch((err) => {
      console.log("Cannot get shop list :", err);
    });
  }

}
