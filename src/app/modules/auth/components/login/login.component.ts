import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { inputValidations } from 'src/app/core/common/utils';
import { AuthService } from '../../services/auth.service';
// import { SpinnerState } from 'src/app/store/state/spinner.state';
// import {
//   hideSpinner,
//   showSpinner,
// } from 'src/app/store/actions/spinner.actions';
import { LoginResponse } from '../../interfaces/auth-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  processing = false;
  message: string;
  hasError: boolean;
  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private store: Store<{ spinner: SpinnerState }>,

    private toaster: ToastrService,
    private authservice: AuthService
  ) {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigateByUrl('/RE/organizations');
    } else {
      this.router.navigate(['/auth/signIn']);
    }
  }

  inputValidationsErrors = (userForm: FormGroup, type: string) => {
    // Check for validation errors
    return inputValidations(userForm, type);
  };

  login(): void {
    // Login the user
    if (
      this.userForm.controls.username.value &&
      this.userForm.controls.password.value
    ) {
      const userDetails = {
        username: this.userForm.controls.username.value.trim(),
        password: this.userForm.controls.password.value.trim(),
      };

      // this.store.dispatch(showSpinner());

      this.authservice.signIn(userDetails).subscribe((res: LoginResponse) => {
        const {
          user: {
            organizations,
            appRole: { name: appRoleName },
          },
          accessToken,
          refreshToken,
        } = res.data;

        // this.store.dispatch(hideSpinner());

        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const Roles = {
          AppRole: appRoleName,
          orgnizations: {
            id: organizations[0]?.organizationResponse?.id || '',
            OrgRole: organizations[0]?.organizationRoleDTO?.name || '',
            OrgType: organizations[0]?.organizationResponse?.type?.name || '',
          },
        };

        localStorage.setItem('Roles', JSON.stringify(Roles));
        if (appRoleName === 'User' && organizations.length === 0) {
          this.router.navigateByUrl('/unauthorized');
        } else {
          this.router.navigateByUrl('/RE/organizations');
        }

        this.toaster.success(`${res.message}`, '');
      });
    }
  }

  onKeyUpPassword(e) {
    if (e.key == 'Enter') {
      this.login();
    }
  }
}
