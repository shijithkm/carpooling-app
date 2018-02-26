import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, EmailValidator, Validators } from '@angular/forms';

import { CarpoolService } from '../carpool.service';

/**
 * 
 * @param c 
 * This function is used to compare password
 */
function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmPassword');
  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    return { invalid: true };
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _carPoolService: CarpoolService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.data.subscribe(v => {
      this._carPoolService.appTitle = v.appTitle;
    });
  }

  createForm() {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, passwordConfirming]],
      carModel: ['', Validators.required]
    }
    );
  }

  onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.status == 'VALID') {
      // Call api to register a user
      this.router.navigate(['ride']);
    }
  }
 

}
