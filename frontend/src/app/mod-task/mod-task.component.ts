import { Component, OnInit } from '@angular/core';
import {urlBackend} from '../config';
import { FormsModule } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';

declare var bootstrap: any; //Variable global para utilizar bootstrap en el componente

@Component({
  selector: 'app-mod-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mod-task.component.html',
  styleUrl: './mod-task.component.css'
})
export class ModTaskComponent {

  task: any | null = null;
  id: string | null = null;
  title: string = "";
  description: string = "";

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
   //obtener la tarea
    this.getTask();
  }

  getTask(){
    fetch(`${urlBackend}/api/task/${this.id}`)
    .then(response => response.json())
    .then(data => {
      this.task = data;
      this.title = this.task.title;
      this.description = this.task.description;
      console.log(this.task);
    })
    .catch(error => {
      console.error("Error: " + error);
    })
  }

  saveTask(){

    if(this.title === '' || this.description === ''){
      this.warningToast();
      return;
    }

    fetch(`${urlBackend}/api/mod/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({title: this.title, description: this.description})
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
