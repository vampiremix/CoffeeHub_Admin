import { Injectable } from '@angular/core';

@Injectable()
export class RouteService {
public route = "https://coffeehubserver.herokuapp.com/";
  constructor() { }

  createAuthorizationHeader() {
    let headers = new Headers();
    let token = window.localStorage.getItem('token');
    headers.append("Authorization", "Bearer " + token);
    return headers;
  }
}
