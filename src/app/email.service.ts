import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContactData } from './models/contact-form';

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
    return this.httpClient.post("http://localhost:3000/email", contactData, headers);
  }
}
