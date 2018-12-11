import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-agregar-ficha',
  templateUrl: 'agregar-ficha.html',
})
export class AgregarFichaPage {
  
  ficha:any = {};
  salir:boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

    logForm() {
    console.log(this.ficha);
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

   ionViewCanLeave(){

    let promesa = new Promise( (resolve, reject)=>{

      if(this.salir == false) {
        let confirmar = this.alertCtrl.create({
          title: "¿Seguro?",
          subTitle: "¿Esta seguro que desea cancelar la creación de la ficha?",
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
