import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./login/login.component').then(m => m.LoginComponent),
            },
            {
                path: 'signup',
                loadComponent: () =>
                    import('./signup/signup.component').then(m => m.SignupComponent),
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'new-task',
                loadComponent: () =>
                    import('./new-task/new-task.component').then(m => m.NewTaskComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'mod-task/:id',
                loadComponent: () =>
                    import('./mod-task/mod-task.component').then(m => m.ModTaskComponent),
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
