import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {

  user!: firebase.default.User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if(user) this.user = user;
    });
  }

  logout(){
    this.afAuth.signOut();
  }
}
