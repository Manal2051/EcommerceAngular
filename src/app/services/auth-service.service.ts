import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  getCustomerId() {
    throw new Error('Method not implemented.');
  }
//nesreen
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }


 constructor(private _HttpClient: HttpClient) { }

 // private readonly _HttpClient= inject(HttpClient);
 _Router= inject(Router);

 userData:any;
userId: string | null = null;

  setRegisterationForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/Account/Register`,data);//link api
  }

  setLoginForm(data:object):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/Account/Login`,data);

  }

  saveUserData():void{

    if(localStorage.getItem('userToken')!==null)
    {

      this.userData=jwtDecode(localStorage.getItem('userToken')!);
       this.userId = this.userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      console.log('userData',this.userData);
      console.log('userId',this.userId);
    }

  }

  sinOut():void{
    localStorage.removeItem('userToken');
    this.userData=null;
    //if in document exists remove token call the api here
    this._Router.navigate(['/login']);

  }
}


