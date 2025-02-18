import { Component, OnInit } from '@angular/core';
import {urlBackend} from '../config';
import { FormsModule } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
   //obtener la tarea
    this.getNote();
  }

  getNote(){
    fetch(`${urlBackend}/api/task/${this.id}`)
    .then(response => response.json())
    .then(data => {
      this.task = data;
      console.log(this.task);
    })
    .catch(error => {
      console.error("Error: " + error);
    })
  }
}
