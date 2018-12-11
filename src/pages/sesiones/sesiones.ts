import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AgregarSesionPage, VerSesionPage} from "../index.paginas";

@Component({
  selector: 'page-sesiones',
  templateUrl: 'sesiones.html',
})
export class SesionesPage {
  
  paginaAgregarSesion:any = AgregarSesionPage;
  paginaVerSesion:any = VerSesionPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SesionesPage');
  }

}
