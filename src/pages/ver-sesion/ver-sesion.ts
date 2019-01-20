import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-ver-sesion',
  templateUrl: 'ver-sesion.html',
})
export class VerSesionPage {

  sesion:any = {};
  editar:boolean = false;
  pacienteClave:string = "";
  fichaClave:string = "";
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public afs: AngularFirestore) {
     this.pacienteClave = this.navParams.get('pacienteClave');
     this.fichaClave = this.navParams.get('fichaClave');
     this.sesion = this.navParams.get('sesion');
  }
  
  ModificarSesion() {
    this.GuardarSesion();
    let loading = this.loadingCtrl.create({
      content: "Agregando..."
    });

    loading.present();

    let promesa = new Promise( ( resolve, reject )=>{

      setTimeout( ()=>{

        loading.dismiss();
        resolve(true)

      }, 2000 );

    });
    
    this.navCtrl.pop();

    return promesa;
  }
  
    
  /* Guardará la sesión en la base de datos de Firebase */
  
  GuardarSesion()
  {
     let path = "pacientes/" + this.pacienteClave + "/fichas/" + this.fichaClave;
     const sesionesCollection = this.afs.doc(path).collection('sesiones');
     sesionesCollection.doc(this.sesion.clave).update({ 
       clave: this.sesion.clave, 
       fechaActual: this.sesion.fechaActual,
       sesion: this.sesion.sesion,
       sugerencias: this.sesion.sugerencias,
       tratamiento: this.sesion.tratamiento,
       datosImportancia: this.sesion.datosImportancia,
       fechaSiguiente : this.sesion.fechaSiguiente
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerSesionPage');
  }

}
