import { Routes } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {authGuard} from "./guard/auth.guard";
import {ViewTaskComponent} from "./components/view-task/view-task.component";
import {UpdateTaskComponent} from "./components/update-task/update-task.component";
import {AddTaskComponent} from "./components/add-task/add-task.component";
import {AdminComponent} from "./components/admin/admin.component";
import {adminGuard} from "./guard/admin.guard";
import {signingGuard} from "./guard/signin.guard";

export const routes: Routes = [
  {
    path : '',
    component: AuthComponent,
    canActivate: [signingGuard]
  },
  {
    path : 'task-manager',
    component: ViewTaskComponent,
    canActivate: [authGuard]
  },
  {
    path : 'task-manager/:taskId',
    component: UpdateTaskComponent,
    canActivate: [authGuard]
  },
  {
    path : 'add-task',
    component: AddTaskComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  }
];
