import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UsersModel } from 'app/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Output() loginUser = new EventEmitter();
  username = "admin";
  password = "P@ssw0rd1234"
  datauser: UsersModel;
  constructor(private http: Http) { }


  ngOnInit() {

  }

  login(user, pass) {
    let data = { username: user, password: pass };
    this.http.post('https://coffeehubserver.herokuapp.com/api/auth/signin', data).toPromise()
      .then(response => {
        this.datauser = response.json() as UsersModel;
        console.log(this.datauser.roles);
        if (this.datauser.roles[0] == 'shopowner' || this.datauser.roles[0] == 'admin'  ) {
          window.localStorage.setItem('token', this.datauser.loginToken);
          window.localStorage.setItem("user", JSON.stringify(this.datauser));
          console.log(JSON.parse(window.localStorage.getItem('user')));
          this.loginUser.emit(this.datauser);
        } else {
          alert("User นี้ ไม่มีสิทธิ์ใช้งาน");
        }

      }).catch((err) => { alert("ERROR Login : " + err) })
  }
}
