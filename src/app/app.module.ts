import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Import Pages
import { PacientesPage, AgregarPacientePage, VerPacientePage,
         FichasPage, AgregarFichaPage, VerFichaPage,
         SesionesPage, AgregarSesionPage, VerSesionPage
       } from '../pages/index.paginas';

@NgModule({
  declarations: [
    MyApp,
    PacientesPage,  AgregarPacientePage,  VerPacientePage,
    FichasPage,  AgregarFichaPage,  VerFichaPage,
    SesionesPage,  AgregarSesionPage,  VerSesionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PacientesPage, AgregarPacientePage, VerPacientePage,
    FichasPage, AgregarFichaPage, VerFichaPage,
    SesionesPage, AgregarSesionPage, VerSesionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
