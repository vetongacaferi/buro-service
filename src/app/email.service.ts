import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContactData } from './models/contact-form';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  public sendMessage(contactData: IContactData){
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // TODO: figure out this part, when we get angular and node js server on production
    return this.httpClient.post(`${environment.ApiUrl}/email`, contactData, headers);
  }
}
