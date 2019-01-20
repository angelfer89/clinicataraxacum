import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AgregarSesionPage, VerSesionPage} from "../index.paginas";

@Component({
  selector: 'page-sesiones',
  templateUrl: 'sesiones.html',
})
export class SesionesPage {
  
  paginaAgregarSesion:any = AgregarSesionPage;
  paginaVerSesion:any = VerSesionPage;
  
  sesiones: Observable<any[]>;
  pacienteClave:string = "";
  fichaClave:string = "";
  fichaMotivo:string = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afs: AngularFirestore) {
                
      this.pacienteClave = this.navParams.get('pacienteClave'); 
      this.fichaClave = this.navParams.get('fichaClave'); 
      this.fichaMotivo = this.navParams.get('fichaMotivo'); 
      let path = "pacientes/" + this.pacienteClave + "/fichas/" + this.fichaClave;
      this.sesiones = afs.doc(path).collection('sesiones').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SesionesPage');
  }

}
