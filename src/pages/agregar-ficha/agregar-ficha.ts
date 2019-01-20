import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-agregar-ficha',
  templateUrl: 'agregar-ficha.html',
})
export class AgregarFichaPage {
  
  ficha:any = {};
  salir:boolean = false;
  pacienteClave:string = "";
  fichaForm : FormGroup;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public afs: AngularFirestore,
              private formBuilder: FormBuilder) {
                
       this.pacienteClave =  this.navParams.get('pacienteClave');
       
       this.fichaForm = this.formBuilder.group({
        motivoPrincipal: ['', Validators.required],
        desdeCuando: ['', Validators.required],
        atribuyeA: ['', Validators.required],
        sintomasFisicos: ['', Validators.required],
        sintomasMentales: ['', Validators.required],
        patologiasAsociadas: ['', Validators.required],
        intervencionesQuirurgicas: ['', Validators.required],
        tratamientoConvencional: ['', Validators.required],
        tratamientoAlternativo: ['', Validators.required],
        alergiasConsumos: ['', Validators.required],
        antecedentesFamiliaresRelacionados: ['', Validators.required],
        antecedentesFamiliaresSalud: ['', Validators.required],
        anteceentesFamiliaresOtros: ['', Validators.required]
        });
       
  }

  AgregarFicha() 
  {
    this.GuardarFicha();
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
  
  /* Guardará la ficha en la base de datos de Firebase */
  
  GuardarFicha()
  {
     let path = "pacientes/" + this.pacienteClave;
     console.log(path);
     const fichasCollection = this.afs.doc(path).collection('fichas');
     const id = this.afs.createId();
     fichasCollection.doc(id).set({ 
       clave: id, 
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


  /* Pregunta si desea cancelar el registro de la ficha.*/
  
  ionViewCanLeave()
  {
    let promesa = new Promise( (resolve, reject)=>{
  
      if(this.salir == false) 
      {
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
      else 
      {
        resolve(true);
      }

    });

    return promesa;
  }

}
