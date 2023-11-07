import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';
import { refreshTokenResponce } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8081/';
  constructor(private http: HttpClient) {}

  //sign in
  signIn(data: UserData) {
    return this.http.post(this.baseUrl + 'api/auth/signin', data);
  }

  //get users data
  getUserProfile()  {
    return this.http.get(this.baseUrl + 'users/me');
  }

  getRefreshToken(): Observable<refreshTokenResponce> {
    const refreshToken = localStorage.getItem('refreshToken');
    const data = {
      refreshToken: refreshToken,
    };
    return this.http.post<refreshTokenResponce>(
      this.baseUrl + 'api/auth/refreshtoken',
      data
    );
  }
}
