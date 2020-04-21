import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StorageService } from './storage.service';

@Injectable()

export class SocketService {

  private url = '';
  private socket;
  idUsuario = "";
  intervaloServicios;
  intervaloGrafico;

  constructor(private sService:StorageService,private localNotifications: LocalNotifications) {    
    if(sService.idUsuario){
      this.idUsuario = sService.idUsuario.toString();
    }
  }
  public async setSocket(url,port){
    if(this.socket){
      this.socket.destroy();
    }
    this.socket = io(url+":"+port,{ forceNew: true,query:"idUsuario="+this.idUsuario });
  }
  public sendQuery(message) {
    this.socket.emit('ejecutar', message);
  }
  public async estadoServicios(tiempo){
    clearTimeout(this.intervaloServicios);
    var self = this;
    if(!this.idUsuario){
      this.idUsuario = (await this.sService.getIdUsuario()).toString();
    }
    this.intervaloServicios = setInterval(function(){
      self.socket.emit('estadoServicios',self.idUsuario);
    }, tiempo );
  }
  public estadoGrafico(tiempo){
    clearTimeout(this.intervaloGrafico);
    var self = this;
    this.intervaloGrafico = setInterval(function(){
      self.socket.emit('estadoGrafico',self.idUsuario);

    }, tiempo );
  }
  public setTiempo(tiempo){
    this.socket.emit('setTiempo', tiempo);
  }
  public getMysql = () => {
    var self = this;
    return Observable.create((observer) => {
        self.socket.on('resMYSQL', (message) => {
            observer.next(message);
        });
    });
  }
  public getApache = () => {
    var self = this;
    return Observable.create((observer) => {
        self.socket.on('resAPACHE2', (message) => {
            observer.next(message);
        });
    });
  }
  public getCron = () => {
    var self = this;
    return Observable.create((observer) => {
        self.socket.on('resCRON', (message) => {
            observer.next(message);
        });
    });
  }
  public getSsh = () => {
    var self = this;
    return Observable.create((observer) => {
        self.socket.on('resSSHD', (message) => {
            observer.next(message);
        });
    });
  }
  public getRes = () => {
    var self = this;
    return Observable.create((observer) => {
        self.socket.on('res', (message) => {
            observer.next(message);
        });
    });
  }
  public getNotif = () => {
    var self = this;
    return Observable.create((observer) => {
      this.socket.on('notificacionLocal', (message) => {
        //console.log("notificado");
        this.notifLocal(message.data)
      });
    })
  }
  public getTotalMem = () =>{
    var self = this;
    return Observable.create((observer) => {
      this.socket.on('totalmem',(message)=>{
        //console.log(message);
          observer.next(message);

      })
    })
  }
  public getCpuUsage = () =>{
    var self = this;
    return Observable.create((observer) => {
      this.socket.on('cpuUsage',(message)=>{
        //console.log(message);
          observer.next(message);
      })
    })
  }
  public getCpuFree = () =>{
    var self = this;
    return Observable.create((observer) => {
      this.socket.on('cpuFree',(message)=>{
        //console.log(message);
          observer.next(message);
      })
    })
  }
  public getFreeMem = () =>{
    var self = this;
    return Observable.create((observer) => {
      this.socket.on('freemem',(message)=>{
        //console.log(message);
          observer.next(message);

      })
    })
  }
  public sendNotification(notif){
    this.socket.emit('notif',notif);
  }
  public notifLocal(notif){
    //console.log("mando notifi");

    this.localNotifications.schedule({
      id: 1,
      text: notif,
    });
  }
}
