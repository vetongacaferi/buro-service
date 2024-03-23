import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContactData } from '../models/contact-form';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;

  submitted: boolean = false;

  sendingMessage = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required]
   
    });
  }
  ngOnInit(): void {

  }

  public onSubmit(): void{
    this.submitted = true;
    console.log('onSubmit clicked');

    if(!this.contactForm.valid){
      return;
    }

    this.sendingMessage = true;
    const contactData: IContactData = this.contactForm.getRawValue();
    console.log('contactForm:', contactData);

    // TODO: handle better service to send message
    this.emailService.sendMessage(contactData).subscribe({
      next: (result) =>{
        if(!result){
          return;
        }
        this.resetFrom();
      },
      error: (error) => console.error(error),
      complete: () => this.sendingMessage = false
  });

  }


  get contactFromControl() {
    return this.contactForm.controls;
  }


  resetFrom(): void{
    this.submitted = false;
    this.contactForm.reset();
  }
}
