import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { urlBackend } from '../config';

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

  constructor(private datePipe: DatePipe) {}

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

}
