import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerPacientePage } from './ver-paciente';

@NgModule({
  declarations: [
    VerPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(VerPacientePage),
  ],
})
export class VerPacientePageModule {}
