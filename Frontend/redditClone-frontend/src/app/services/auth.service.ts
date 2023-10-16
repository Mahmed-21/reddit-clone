import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { ServiceResponse } from './service-response.service';
import { ChangeDetectorRef } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5296/Auth';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isUser = '';
  
  constructor(private http: HttpClient) { }

  registerAndLogin(userRegister: any): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(`${this.apiUrl}/Register`, userRegister)
      .pipe(
        switchMap(registerResponse => {
          if (registerResponse.success) {
            const userLogin: any = {
              username: userRegister.username,
              password: userRegister.password
            };
            return this.login(userLogin);
          } else {
            throw new Error('Registration failed');
          }
        })
      );
  }

  login(userLogin: any): Observable<ServiceResponse<string>> {
    return this.http.post<ServiceResponse<string>>(`${this.apiUrl}/Login`, userLogin).pipe(
      map(response => {
        if (response.success && response.data) {
          localStorage.setItem('token', response.data);
          this.isUser= this.getUsername(localStorage.getItem('token'));
          this.isAuthenticatedSubject.next(true);
        }
        return response;
      })
    );
  }

  public isLoggedIn() {
    return this.isAuthenticatedSubject.value;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.isUser= '';
    localStorage.removeItem('token');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public getUsername(token: any): any {
      var tokenInfo = this.getDecodedAccessToken(token).unique_name;
      return tokenInfo;
  }
}
