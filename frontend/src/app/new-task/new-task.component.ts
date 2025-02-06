import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {urlBackend} from '../config';

declare var bootstrap: any; //Variable global para utilizar bootstrap en el componente

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  title = "";
  description = "";

  async addTask(){

    if(this.title === "" || this.description === ""){
      this.warningToast();
      return;
    }

    const response = await fetch(urlBackend + '/api/save', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'      
      },
      body: JSON.stringify({
        title: this.title,
        description: this.description
      })
    })

    console.log(response);

    if(response.ok){
      this.successToast();
      this.title = "";
      this.description = "";

    }else{
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



}
