import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AgregarFichaPage, VerFichaPage, SesionesPage } from "../index.paginas";

@Component({
  selector: 'page-fichas',
  templateUrl: 'fichas.html',
})
export class FichasPage {
  
  paginaAgregarFicha:any = AgregarFichaPage;
  paginaVerFicha:any = VerFichaPage;
  paginaSesiones:any = SesionesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FichasPage');
  }

}
