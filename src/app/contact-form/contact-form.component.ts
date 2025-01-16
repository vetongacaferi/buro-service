import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmailService } from '../email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContactData } from '../models/contact-form';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Output() openModal = new EventEmitter();

  contactForm: FormGroup;

  submitted: boolean = false;

  isSending = false;

  errorMessage: string = 'Something went wrong, please try again later!';
  
  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required],
      agreeWithTermsAndServices: ['', Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
  }

  public onButtonSubmit() {
    this.openModal.emit();
  }
  
  public onSubmit(): void{
    this.submitted = true;

    if(!this.contactForm.valid){
      return;
    }

    this.isSending = true;
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
      error: (error) => {
        console.error(error);
        console.log('error:', error);
        this.isSending = false;
      },
      complete: () => {
        this.isSending = false;
        console.log('complete:');
      }
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
