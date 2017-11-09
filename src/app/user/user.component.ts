import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  headers = new Headers({
    'Content-Type': 'application/json'
  });

  optionsURL = new RequestOptions({
    headers: this.headers
  });
  constructor(private http: Http) { }

  ngOnInit() {
    let signindata = { username: "amonratCha", password: "P@ssw0rd1234"};
    this.http.post('https://coffeehubserver.herokuapp.com/api/auth/signin', signindata, this.optionsURL).subscribe(data => {
      console.log("user : " , data);
      let ss = {name:"test"};
      this.http.post('https://coffeehubserver.herokuapp.com/api/favorites/',ss,this.optionsURL).subscribe(data2 => {
        console.log("Shop response : ", data2);
      })
    });
   
  }

}
