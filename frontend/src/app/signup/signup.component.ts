import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {urlBackend} from '../config';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  surnames: string = '';
  email: string = '';
  password: string = '';

}
