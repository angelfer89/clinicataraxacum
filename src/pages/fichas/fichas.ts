import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AgregarFichaPage, VerFichaPage, SesionesPage } from "../index.paginas";

@Component({
  selector: 'page-fichas',
  templateUrl: 'fichas.html',
})

export class FichasPage {
  
  paginaAgregarFicha:any = AgregarFichaPage;
  paginaVerFicha:any = VerFichaPage;
  paginaSesiones:any = SesionesPage;
  
  pacienteClave:string = "";
  pacienteNombre:string = "";
  
  fichas: Observable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afs: AngularFirestore) {
              
    this.pacienteClave = this.navParams.get('clave');  
    this.pacienteNombre = this.navParams.get('nombre'); 
    let path = "pacientes/" + this.pacienteClave;
    this.fichas = afs.doc(path).collection('fichas').valueChanges();  

  }

}
