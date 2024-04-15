import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { AuthenticationService } from '@tcloud/auth';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}
  loginForm = this._formBuilder.group({
    account: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    // Perform login logic here
    if (this.loginForm.valid) {
      this.authService.login(
        environment.storageKey,
        this.loginForm.controls.account.value ?? '',
        this.loginForm.controls.password.value ?? ''
      );
    } else {
      // Clear all former messages and display an error message
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Please check your account and password.',
      });
    }
  }
}
