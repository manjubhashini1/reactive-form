import { Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'task-form', pathMatch: 'full' },
  { path: 'task-form', component: TaskFormComponent }
];
