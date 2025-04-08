import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonList, IonLabel, IonInput, IonItem, IonButton, IonGrid } from '@ionic/angular/standalone';
import { LoadingController, AlertController } from '@ionic/angular';

import { AuthResponseData, AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonGrid, IonButton, IonItem, IonInput, IonLabel, IonList, IonCol, IonRow, 
    IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, ReactiveFormsModule, CommonModule],
})
export class AuthPage {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

 
  // authenticate(email: string, password: string) {
  //   this.isLoading = true;
  //   // this.loadingCtrl
  //   //   .create({ keyboardClose: true, message: 'Logging in...' })
  //   //   .then(loadingEl => {
  //       // loadingEl.present();
  //       let authObs: Observable<AuthResponseData>;
  //       if (this.isLogin) {
  //         authObs = this.authService.login(email, password);
  //       } else {
  //         authObs = this.authService.signup(email, password);
  //       }
  //       authObs.subscribe(
  //         resData => {
  //           console.log(resData);
  //           this.isLoading = false;
  //           // loadingEl.dismiss();
  //           this.router.navigateByUrl('/tabs/tab1');
  //         },
  //         errRes => {
  //           // loadingEl.dismiss();
  //           const code = errRes.error.error.message;
  //           let message = 'Could not sign you up, please try again.';
  //           if (code === 'EMAIL_EXISTS') {
  //             message = 'This email address exists already!';
  //           } else if (code === 'EMAIL_NOT_FOUND') {
  //             message = 'E-Mail address could not be found.';
  //           } else if (code === 'INVALID_PASSWORD') {
  //             message = 'This password is not correct.';
  //           }
  //           this.showAlert(message);
  //         }
  //       );
  //     // });
  // }

  async authenticate(email: string, password: string) {
    this.isLoading = true;
  
    let authObs: Observable<AuthResponseData>;
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
  
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigateByUrl('/tabs/tab1');
      },
      (errRes) => {
        const code = errRes.error?.error?.message;
        let message = 'Could not sign you up, please try again.';
        if (code === 'EMAIL_EXISTS') {
          message = 'This email address exists already!';
        } else if (code === 'EMAIL_NOT_FOUND') {
          message = 'E-Mail address could not be found.';
        } else if (code === 'INVALID_PASSWORD') {
          message = 'This password is not correct.';
        }
  
        this.showAlert(message);
      }
    );
  }
  

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
