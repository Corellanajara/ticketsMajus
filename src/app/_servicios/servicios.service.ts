import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface Servicio{
  _id:string;
  titulo: string;
  tiempoRefresco: number;
  comando: string;
  idUsuario : string;
  estado: number;
}

@Injectable()

export class ServicioService {

  private url: string = "http://178.128.71.20:8080";
  idUsuario = '';
  constructor(private sService:StorageService,private http: HttpClient) {

  }

  async listar() {
    this.idUsuario = (await this.sService.getIdUsuario()).toString();
    return this.http.get<Servicio[]>(`${this.url}/api/servicios/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idusuario',this.idUsuario)
    });
  }

  insertar(servicios : Servicio){
    return this.http.post<Servicio>(`${this.url}/api/servicios/`,servicios, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idusuario',this.idUsuario)
    });
  }

  actualizar(id:string,servicio : Servicio){
    return this.http.put<Servicio>(`${this.url}/api/servicios/${id}`,servicio,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idusuario',this.idUsuario)
    });
  }

  borrar(id:string,servicio : Servicio){
    if(servicio.estado==1)
    {
      servicio.estado = 0;
    }
    else{
      servicio.estado = 1;
    }

    return this.http.put<Servicio>(`${this.url}/api/servicios/${id}`, servicio,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idusuario',this.idUsuario)
    });
  }

  gathering(id:string){
    return this.http.get<Servicio>(`${this.url}/api/servicios/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idusuario',this.idUsuario)
    });
  }

  listarById(id:string){
    return this.http.get<Servicio>(`${this.url}/api/servicios/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('idusuario',this.idUsuario)
    });
  }
}
