import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';
import { UserData } from 'src/app/core/models/user.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent implements OnInit {
  user: UserData;
  name = 'User';
  accessNavBar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      this.accessNavBar = true;
    }
    // // const decoded = helper.decodeToken(token);
    // // const user = {
    // //   id: decoded.id,
    // //   name: decoded.name,
    // //   email: decoded.email,
    // // };

    // this.name = _.upperFirst(user.name);
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/signIn');
  }
}
