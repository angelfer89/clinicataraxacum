import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-agregar-paciente',
  templateUrl: 'agregar-paciente.html',
})
export class AgregarPacientePage {

  pacienteForm : FormGroup;
  paciente:any = {};
  salir:boolean = false; // Determina si vamos a salir de la ventana de registro

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public afs: AngularFirestore,
              private formBuilder: FormBuilder) {

      this.pacienteForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        lugarNacimiento: ['', Validators.required],
        edad: ['', Validators.required],
        celular: ['', Validators.required],
        correo: ['', Validators.required],
        profesion: ['', Validators.required],
        trabajoActual: ['', Validators.required]
      });
  }

  AgregarPaciente() {
      this.GuardarPaciente();
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


  /* Guardará el paciente en la base de datos de Firebase */

  GuardarPaciente()
  {
     const pacientesCollection = this.afs.collection('pacientes');
     const id = this.afs.createId();
     pacientesCollection.doc(id).set({
       clave: id,
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

  /* Pregunta si desea cancelar el registro del paciente.*/

   ionViewCanLeave()
   {
      let promesa = new Promise( (resolve, reject)=>{

        if(this.salir == false)
        {
          let confirmar = this.alertCtrl.create({

            title: "¿Seguro?",
            subTitle: "¿Esta seguro que desea cancelar la creación del paciente?",
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
