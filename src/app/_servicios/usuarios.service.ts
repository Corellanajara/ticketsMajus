import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface Usuario{
  nombreUsuario : string;
  nombre: string;
  apellido : string;
  correo : string;
  clave : string;
  estado : number;
}

@Injectable()

export class UsuarioService {
  idUsuario = "";
  accessToken = "";
  private url: string = "http://178.128.71.20:8080";


  constructor(private sService:StorageService,private http: HttpClient) {
    if(sService.idUsuario){
      this.idUsuario = sService.idUsuario.toString();
    }
    if(sService.accessToken){
      this.accessToken = sService.accessToken.toString();
    }
  }

  async listar() {
    return this.http.get<Usuario[]>(`${this.url}/users/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  login(datos){
    return this.http.post<any>(`${this.url}/users/login/`,datos, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
  insertar(usuario : Usuario){
    usuario.estado = 1;
    return this.http.post<Usuario>(`${this.url}/users/`,usuario, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  actualizar(id:string,usuario : Usuario){
    return this.http.patch<Usuario>(`${this.url}/users/${id}`, usuario,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${this.accessToken}`)
    });
  }

  borrar(id:string,usuario : Usuario){
    return this.http.put<Usuario>(`${this.url}/users/${id}`, usuario,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }

  async gathering(id:string){
    this.accessToken = (await this.sService.getAccesToken()).toString();
    return this.http.get<Usuario>(`${this.url}/users/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${this.accessToken}`)
    });
  }

  listarById(id:string){
    return this.http.get<Usuario>(`${this.url}/users/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
    });
  }
}
