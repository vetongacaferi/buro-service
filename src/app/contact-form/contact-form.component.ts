import { Component } from '@angular/core';
import { EmailService } from '../email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContactData } from '../models/contact-form';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public onSubmit(): void{
    console.log('onSubmit clicked');

    if(!this.contactForm.valid){
      return;
    }

    const contactData: IContactData = this.contactForm.getRawValue();
    console.log('contactForm:', contactData);

    // TODO: handle better service to send message
    this.emailService.sendMessage(contactData).subscribe( result => {
      console.log('result:', result);
    });

  }
}
