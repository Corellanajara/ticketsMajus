import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TicketService } from '../_servicios/tickets.service';
import { TicketPage } from '../ticket/ticket.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tickets = [];
  constructor(private modalController : ModalController,private alertController : AlertController, private tService : TicketService) {
    this.traerDatos();
  }
  traerDatos(){
    this.tService.listar().subscribe(data=>{
      console.log(data);
      this.tickets = data;
      console.log(this.tickets);
    })
  }
  async confirmDelete(ticket) {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Quieres eliminar este ticket?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.eliminar(ticket);
          }
        }
      ]
    });

    await alert.present();
  }
  async verTicket(ticket) {
    const modal = await this.modalController.create({
      component: TicketPage,
      componentProps:{
        "ticket":ticket
      }
    });
    return await modal.present();
  }
  eliminar(ticket){
    this.tService.borrar(ticket['id']).subscribe(res=>{
      console.log(res);
      this.traerDatos();
    })
  }

}
