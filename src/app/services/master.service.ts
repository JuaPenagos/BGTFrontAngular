import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsetting';
import { Category } from '../model/Category';
import { History } from '../model/History';
import { Observable, of } from 'rxjs';
import { ResponseActiveFunding } from '../model/ResponseActiveFunding';
import { Funding } from '../model/Funding';
import { EmailResponse } from '../model/EmailResponse';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private http = inject(HttpClient);
  private baseUrl:string = appsettings.apiUrl;

  constructor() { }

  getHistory(): Observable<History[]>{
    return this.http.get<History[]>(`${this.baseUrl}History`)
  }

  getActiveFunding(): Observable<ResponseActiveFunding>
  {
    return this.http.get<ResponseActiveFunding>(`${this.baseUrl}ActiveFunding`)
  }

  getCategories(): Observable<Category[]>
  {
    return this.http.get<Category[]>(`${this.baseUrl}Category`)
  }

  AddActiveFunding(objeto:Funding): Observable<ResponseActiveFunding>{
    return this.http.post<ResponseActiveFunding>(`${this.baseUrl}ActiveFunding/AddActiveFunding`, objeto)
  }

  DeleteFunding(id:string): any{
    return this.http.delete<any>(`${this.baseUrl}ActiveFunding/DeleteFunding?id=${id}`)
  }
  SendEmail(): Observable<EmailResponse>{
    return this.http.post<EmailResponse>(`${this.baseUrl}Mails/SendEmail`,null)
  }

}

