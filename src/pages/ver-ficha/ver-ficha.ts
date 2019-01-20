import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-ver-ficha',
  templateUrl: 'ver-ficha.html',
})
export class VerFichaPage {

  ficha:any = {};
  pacienteClave:string = "";
  editar:boolean = false;
  
  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public afs: AngularFirestore) {
     this.pacienteClave =  this.navParams.get('pacienteClave');
     this.ficha = this.navParams.get('ficha');
  }
  
  ModificarFicha() 
  {
    this.GuardarFicha();
    let loading = this.loadingCtrl.create({
      content: "Modificando..."
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
  
  /* Guardará la ficha en la base de datos de Firebase */
  
  GuardarFicha()
  {
     let path = "pacientes/" + this.pacienteClave;
     const fichasCollection = this.afs.doc(path).collection('fichas');
     fichasCollection.doc(this.ficha.clave).update({ 
       clave: this.ficha.clave, 
       motivoPrincipal: this.ficha.motivoPrincipal,
       desdeCuando: this.ficha.desdeCuando,
       atribuyeA: this.ficha.atribuyeA,
       sintomasFisicos: this.ficha.sintomasFisicos,
       sintomasMentales: this.ficha.sintomasMentales,
       patologiasAsociadas: this.ficha.patologiasAsociadas,
       intervencionesQuirurgicas: this.ficha.intervencionesQuirurgicas,
       tratamientoConvencional: this.ficha.tratamientoConvencional,
       tratamientoAlternativo: this.ficha.tratamientoAlternativo,
       alergiasConsumos: this.ficha.alergiasConsumos,
       antecedentesFamiliaresRelacionados: this.ficha.antecedentesFamiliaresRelacionados,
       antecedentesFamiliaresSalud: this.ficha.antecedentesFamiliaresSalud,
       anteceentesFamiliaresOtros: this.ficha.anteceentesFamiliaresOtros
     });
  }


}
