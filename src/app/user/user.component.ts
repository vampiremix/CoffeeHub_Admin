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


  constructor(private http: Http, ) {

   }

  ngOnInit() {
    let signindata = { username: "amonratCha", password: "P@ssw0rd1234" };


    this.http.post('https://coffeehubserver.herokuapp.com/api/auth/signin', signindata).toPromise()
      .then(response => {
        this.datauser = response.json() as UsersModel;
        console.log(this.datauser);
        let ss = { name: "test" };
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + this.datauser.loginToken);
        this.http.post('https://coffeehubserver.herokuapp.com/api/favorites/', ss, { headers: headers }).subscribe(data2 => {
          console.log("Shop response : ", data2);
        })
      })
      .catch((error) => {
        console.log(error);
      });



  }

}
