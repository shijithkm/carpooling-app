import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { CarpoolService } from '../carpool.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFailed: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _carPoolService: CarpoolService,
    private _userService: UserService
  ) { 
      this.isLoginFailed = false;
      this._userService.clearLogin();
      this.createForm();
  }

  ngOnInit() {
      this.route.data.subscribe(v => {
      this._carPoolService.appTitle = v.appTitle;
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.loginForm.status == 'VALID') {
      if(this._userService.validateLogin(this.loginForm.value) == false){
        this.isLoginFailed = true;
      }
    }
  }

}
