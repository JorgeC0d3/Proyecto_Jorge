import { Routes } from '@angular/router';

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
            },
            {
                path: 'new-task',
                loadComponent: () =>
                    import('./new-task/new-task.component').then(m => m.NewTaskComponent),
            },
            {
                path: 'mod-task/:id',
                loadComponent: () =>
                    import('./mod-task/mod-task.component').then(m => m.ModTaskComponent),
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
