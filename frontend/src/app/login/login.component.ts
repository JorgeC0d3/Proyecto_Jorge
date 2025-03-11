import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {urlBackend} from '../config';
import {Router, RouterLink} from '@angular/router';

declare var bootstrap: any; //Variable global para utilizar bootstrap en el componente

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  async signin(){
  
      if(this.email === '' || this.password === ''){
        this.warningToast();
        return;
      }
  
      const userData = {
        email: this.email,
        password: this.password
      }
  
      try{
  
        const response = await fetch(`${urlBackend}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
  
        const data = await response.json();

        if(data.message === 'Usuario no encontrado'){
          this.infoToast();
          return;
        }

        if(data.message === 'Contraseña incorrecta'){
          this.warningToast();
          return;
        }

        console.log(data);
        this.email = '';
        this.password = '';
  
        this.successToast();
  
      }catch(error){
        this.errorToast();
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
