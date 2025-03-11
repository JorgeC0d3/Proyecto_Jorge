import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {urlBackend} from '../config';
import {Router, RouterLink} from '@angular/router';

declare var bootstrap: any; //Variable global para utilizar bootstrap en el componente

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

  async signup(){

    if(this.name === '' || this.surnames === '' || this.email === '' || this.password === ''){
      this.warningToast();
      return;
    }

    const userData = {
      name: this.name,
      surnames: this.surnames,
      email: this.email,
      password: this.password
    }

    try{

      const response = await fetch(`${urlBackend}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json();
      console.log(data);
      this.name = '';
      this.surnames = '';
      this.email = '';
      this.password = '';

      if(data.message === 'El usuario ya existe'){
        this.infoToast();
        return;
      }

      this.successToast();

    }catch(error){
      this.errorToast();
      console.log('Error al dar de alta el usuario');
    }
  }

  //Toast Error
  errorToast(){
    const toastElement = document.getElementById("toast-error");
    const toast = new bootstrap.Toast(toastElement!);
    toast.show();
  }

  //Toast Success
  successToast(){
    const toastElement = document.getElementById("toast-success");
    const toast = new bootstrap.Toast(toastElement!);
    toast.show();
  }

  //Toast Warning
  warningToast(){
    const toastElement = document.getElementById("toast-warning");
    const toast = new bootstrap.Toast(toastElement!);
    toast.show();
  }

  //Toast Info
  infoToast(){
    const toastElement = document.getElementById("toast-info");
    const toast = new bootstrap.Toast(toastElement!);
    toast.show();
  }


}
