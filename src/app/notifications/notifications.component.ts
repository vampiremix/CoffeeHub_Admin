import { Component, OnInit, Injectable } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
@Injectable()
export class NotificationsComponent implements OnInit {

  constructor() { }
  showNotification(from, align,text,types){
      const type = ['','info','success','warning','danger'];

    //   const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: text

      },{
          type: type[types],
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
  }
  ngOnInit() {
  }

}
