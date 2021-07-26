import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sample1Component } from './project1/component/sample1/sample1.component';


const routes: Routes = [
  { path: '', component: Sample1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
