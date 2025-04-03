import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  user: any = {};

  constructor(public router: Router){}

  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
