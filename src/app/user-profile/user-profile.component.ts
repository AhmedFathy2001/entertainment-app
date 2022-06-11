import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from 'firebase/auth';
import { AuthService } from '../auth-screen/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userData!: DocumentData;
  uid!: string;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  userDataChanged: boolean = false;
  password: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';

  constructor(
    private _authService: AuthService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}
  onSignOut() {
    this._authService.SignOut();
  }
  async ngOnInit() {
    this.uid = await JSON.parse(localStorage.getItem('user')!).uid;
    let usersRef = await this.afs.firestore
      .collection('users')
      .doc(this.uid)
      .get();
    this.userData = usersRef.data()!;
    this.firstName = this.userData['firstName'];
    this.lastName = this.userData['lastName'];
    this.email = this.userData['email'];
  }
  onNewPasswordChange() {
    if (
      this.password.trim() != '' &&
      this.newPassword.trim() != '' &&
      this.newPasswordConfirm.trim() != '' &&
      this.password != this.newPassword &&
      this.newPassword == this.newPasswordConfirm
    ) {
      this.afAuth.currentUser
        .then(async (u) => {
          try {
            await u?.updatePassword(this.newPassword);
          } catch (error) {
            alert(error);
          }
        })
        .then(() => alert('Password updated!'));
    } else {
      alert('Password change failed');
    }
  }
  onUserDataSave() {
    if (this.userData['email'] != this.email) {
      const auth = getAuth();
      verifyBeforeUpdateEmail(auth.currentUser!, this.email)
        .then(() => {
          alert('Email Verification sent');
        })
        .catch((error) => {
          alert('Error updating userdata' + error);
        });
    }
    if (
      this.userData['firstName'] != this.firstName ||
      this.userData['lastName'] != this.lastName
    ) {
      this.userData['firstName'] = this.firstName;
      this.userData['lastName'] = this.lastName;
      alert('Change Successful!');
    }
    this.afs.collection('users').doc(this.uid).update(this.userData);
  }
}
