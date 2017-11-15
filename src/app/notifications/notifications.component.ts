import { Component, OnInit, Injectable } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
declare var $: any;
@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    providers: [MessageService]
})
@Injectable()
export class NotificationsComponent implements OnInit {

    constructor(private messageService: MessageService) { }
    showNotify(typeselect, headmsg, detailmsg) {
        const type = ['success', 'info', 'warn', 'error'];
        this.messageService.add({ severity: 'success', summary: headmsg, detail: detailmsg });
    }

    showNotification(from, align, text, types) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        //   const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: text

        }, {
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
