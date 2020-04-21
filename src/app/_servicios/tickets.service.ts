import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface Ticket{
  para :  string;
  asunto :  string;
  nombre :  string;
  descripcion :  string;
  correo :  string;
  tipo :  string;
  estado : number;
}

@Injectable()

export class TicketService {

  private url:    string = "http://178.128.71.20:8080";
  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Ticket[]>(`${this.url}/tickets/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:  string,ticket : Ticket){
    return this.http.patch<Ticket>(`${this.url}/tickets/${id}`, ticket,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  borrar(id){
    return this.http.delete<Ticket>(`${this.url}/tickets/${id}`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

}
