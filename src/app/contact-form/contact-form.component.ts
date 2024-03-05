import { Component } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  constructor(private emailService: EmailService) {
  }

  public onFormSubmit(): void{
    console.log('onFormSubmit');
    this.emailService.sendMessage({'message': 'empty'}).subscribe( result => {
      console.log('result:', result);
    });    

  }
}
