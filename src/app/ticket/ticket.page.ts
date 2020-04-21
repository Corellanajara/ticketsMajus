import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  ticket;
  constructor(private navParams : NavParams) {
    var ticket = this.navParams.get("ticket");
    console.log(ticket);
    ticket.estado = ticket.estado || 1;
    this.ticket = ticket;

  }

  ngOnInit() {
  }

}
