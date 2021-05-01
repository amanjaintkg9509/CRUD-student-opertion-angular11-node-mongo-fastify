import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './student/add-edit/add-edit.component';
import { Bad404Component } from './student/bad404/bad404.component';
import { ListComponent } from './student/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddEditComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditComponent,
  },
  {
    path: '**',
    component: Bad404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
