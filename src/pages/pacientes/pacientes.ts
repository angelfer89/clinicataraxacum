import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AgregarPacientePage, VerPacientePage } from "../index.paginas";

@Component({
  selector: 'page-pacientes',
  templateUrl: 'pacientes.html',
})
export class PacientesPage {

  paginaAgregarPaciente:any = AgregarPacientePage;
  paginaVerPaciente:any = VerPacientePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientesPage');
  }

}
