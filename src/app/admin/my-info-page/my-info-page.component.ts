import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Admin} from "../../shared/interfaces";
import {DbService} from "../../shared/services/db.service";

@Component({
  selector: 'app-my-info-page',
  templateUrl: './my-info-page.component.html',
  styleUrls: ['./my-info-page.component.scss']
})
export class MyInfoPageComponent implements OnInit {
  // here I can edit my data and edit this data in .json
  form: FormGroup;
  isLoaded = false;
  constructor(private authService: AuthService,
              private dbService: DbService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      surname: new FormControl(this.authService.activeUser.surname, [Validators.required]),
      name: new FormControl(this.authService.activeUser.name, [Validators.required]),
      email: new FormControl(this.authService.activeUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.authService.activeUser.password, [Validators.minLength(6)])
    });
    this.isLoaded = true;
  }

  editAdmin() {
    this.isLoaded = false;
    const editedAdmin: Admin = {
      id: this.authService.activeUser.id,
      surname: this.form.get('surname').value,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    this.dbService.editAdmin(editedAdmin).subscribe(editedAdminFromServer => {
      this.authService.activeUser = editedAdmin;
      this.isLoaded = true;
      console.log('new admin ', this.authService.activeUser);
    });
  }
}
