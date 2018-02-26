import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  public username: string;

  constructor(private router: Router) { }

  /** 
   * This function return weather user logged in or not
   */
  getUserLoggedIn() {
    return (localStorage.getItem('isLoggedIn') == "true") ? true : false;
  }

  /**
   * 
   * @param value object with username and password
   * username and password are hardcoded rightnow
   * laster we can implement jwt token based auth
   */
  validateLogin(value: any) {

    if ((value.username == 'developer.shijith@gmail.com'
      || value.username == '9902172291')
      && value.password == 'password') {

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', value.username);
      this.username = value.username;
      this.router.navigate(['/ride']);
    }

  }

}
