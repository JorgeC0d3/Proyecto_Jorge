import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { urlBackend } from '../config';

declare var bootstrap: any; //Variable global para utilizar bootstrap en el componente

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user: any = {};
  newPassword: string = '';

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  async changePassword(){

    if(this.newPassword === ''){
      this.warningToast();
      return;
    }
    
    const data = {
      email: this.user.email,
      newPassword: this.newPassword
    }

    fetch(`${urlBackend}/api/change-password/`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() =>{
      this.successToast();
    })
    .catch(error => {
      this.errorToast();
    })
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

  

}
