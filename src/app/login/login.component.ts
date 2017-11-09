import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UsersModel } from 'app/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user;
  auth: { username: '', password: '' };
  constructor(private http: Http) { }
  datauser: UsersModel;
  ngOnInit() {
  }
  login(user, pass) {
    let data = { username: user, password: pass };
    this.http.post('https://coffeehubserver.herokuapp.com/api/auth/signin', data).toPromise()
      .then(response => {
        this.datauser = response.json() as UsersModel;
        console.log(this.datauser.roles);
        if (this.datauser.roles[0] !== 'shopowner' ) {
          alert("User นี้ ไม่มีสิทธิ์ใช้งาน");
        }else{
          this.user = this.datauser;
          window.localStorage.setItem("user", JSON.stringify(this.datauser));
        }

      }).catch((err) => { alert("ERROR Login : " + err) })
  }
}
