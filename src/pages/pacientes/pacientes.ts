import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgregarPacientePage, VerPacientePage, FichasPage } from "../index.paginas";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-pacientes',
  templateUrl: 'pacientes.html',
})
export class PacientesPage {

  paginaAgregarPaciente:any = AgregarPacientePage;
  paginaVerPaciente:any = VerPacientePage;
  paginaFichas:any = FichasPage;
  pacientes: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public db: AngularFirestore) {

      this.pacientes = db.collection('pacientes').valueChanges();
  }

}
