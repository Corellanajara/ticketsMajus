import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';



@Injectable()

export class StorageService {

  public idEmpresa = 0;
  public idUsuario = 0;
  public accessToken = '';
  constructor(private http: HttpClient,private storage : Storage) {
    this.storage.get('idUsuario').then((value) => {
      this.idUsuario = value;
    });
    this.storage.get('accessToken').then( (value)=>{
      this.accessToken = value;
    })
  }

  getIdUsuario(){
    return new Promise(resolve => {
      this.storage.get('idUsuario').then((value)=>{
        this.idEmpresa = value;
        resolve(value);
      });
    })
  }
  getAccesToken(){
    return new Promise(resolve => {
      this.storage.get('accessToken').then((value)=>{
        this.idEmpresa = value;
        resolve(value);
      });
    })
  }


}
