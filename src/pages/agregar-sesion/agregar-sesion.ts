import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-agregar-sesion',
  templateUrl: 'agregar-sesion.html',
})

export class AgregarSesionPage {
  
  sesion:any = {};
  salir:boolean = false;
  pacienteClave:string = "";
  fichaClave:string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public afs: AngularFirestore) {
                
       this.pacienteClave =  this.navParams.get('pacienteClave');
       this.fichaClave =  this.navParams.get('fichaClave');
  }

    AgregarSesion() {
    this.GuardarSesion();
    this.salir = true;
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
     console.log(path);
     const sesionesCollection = this.afs.doc(path).collection('sesiones');
     const id = this.afs.createId();
     sesionesCollection.doc(id).set({ 
       clave: id, 
       fechaActual: this.sesion.fechaActual,
       sesion: this.sesion.sesion,
       sugerencias: this.sesion.sugerencias,
       tratamiento: this.sesion.tratamiento,
       datosImportancia: this.sesion.datosImportancia,
       fechaSiguiente : this.sesion.fechaSiguiente
     });
  }


  /* Pregunta si desea cancelar el registro de la sesión.*/
  

   ionViewCanLeave(){

    let promesa = new Promise( (resolve, reject)=>{

      if(this.salir == false) {
        let confirmar = this.alertCtrl.create({
          title: "¿Seguro?",
          subTitle: "¿Esta seguro que desea cancelar la creación de la sesión",
          buttons: [
            {
              text: 'Cancelar',
              handler: () => resolve(false)
            },
            {
              text: '¡Seguro!',
              handler: () => resolve(true)
            }
          ]

        });

        confirmar.present();
      }
      else {
        resolve(true);
      }

    });

    return promesa;
   }

}
