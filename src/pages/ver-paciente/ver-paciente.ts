import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-ver-paciente',
  templateUrl: 'ver-paciente.html',
})

export class VerPacientePage {

  paciente:any = {};
  editar:boolean = false;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public afs: AngularFirestore) {
                
     this.paciente = this.navParams.get('paciente');
  }
  
  ModificarPaciente(){
    this.GuardarPaciente();
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
  
  GuardarPaciente()
  {
     const pacientesCollection = this.afs.collection('pacientes');
     pacientesCollection.doc(this.paciente.clave).update({ 
       nombre: this.paciente.nombre, 
       fechaNacimiento: this.paciente.fechaNacimiento,
       lugarNacimiento: this.paciente.lugarNacimiento,
       edad: this.paciente.edad,
       celular: this.paciente.celular,
       correo: this.paciente.correo,
       profesion: this.paciente.profesion,
       trabajoActual: this.paciente.trabajoActual
     });
  }
  
}
