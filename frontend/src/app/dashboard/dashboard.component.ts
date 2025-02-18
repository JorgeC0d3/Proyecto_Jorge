import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { urlBackend } from '../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [DatePipe],
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tasks: any[] = [];

  constructor(private datePipe: DatePipe, private router: Router) {}

  formatearFecha(fecha: any): string | null {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm');
  }

  getTasks(){
    fetch(`${urlBackend}/api/alltasks`)
    .then(response => response.json())
    .then(tasks => {
      this.tasks = tasks;
      console.log(this.tasks);
    })
  }

  ngOnInit(){
    this.getTasks();
  }

  deleteTasks(id: string){
    //console.log(id);
    fetch(`${urlBackend}/api/delete/${id}`, {method: 'DELETE'})
    .then(response => response.json())
    .then((data) =>{
      console.log(data);
      this.getTasks();
    })
    .catch(error => {
      console.error("error: " + error);
    })
  }

  updateTask(id: string){
    this.router.navigate(['/mod-task/', id]);

  }
}
