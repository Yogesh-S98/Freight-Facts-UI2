import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/auth-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authservice: AuthService, private toastr: ToastrService) {}
  login() {
    const userDetails = {
      username: 'imgadmin@yopmail.com',
      password: 'test@123',
    }
    this.authservice.signIn(userDetails).subscribe(() => {
      // this.toastr.success('fdas');
    });
  }
  ngOnInit(): void {
  }
}
