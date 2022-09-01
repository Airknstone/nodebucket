/***************************************************
Title: app-routing.module.ts
Author: Professor Krasso
Date: 08-20-2022
Modified By: Allan Trejo
Description: Routing module.
Code Attribution: https://material.angular.io
                  https://angular.io

***********************************************/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthGuard } from './shared/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [ AuthGuard ]
      }
      ,
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [ AuthGuard ]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
