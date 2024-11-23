import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

  private isAuthenticated() : boolean{
    return localStorage.getItem("LoginToken") != null
  }

  getToken(): string | null{
    return localStorage.getItem("LoginToken");
  }

  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated)
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${environment.baseUrl}/api/Admin/Login`,
        loginRequest
      )
      .pipe(
        tap((loginResult) => {
          if (loginResult.success) {
            localStorage.setItem(`LoginToken`, loginResult.token);
            this.setAuthStatus(true);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem("LoginToken");
    this.setAuthStatus(false);
  }
}
