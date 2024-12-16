import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultComponent } from './Home-tkt-bkng/result/result.component';
import { HomeTktBkngComponent } from './Home-tkt-bkng/home-tkt-bkng/home-tkt-bkng.component';

export const routes: Routes = [
    { path: '', component: HomeTktBkngComponent }, 
    { path: 'search-results', component: ResultComponent }, 
    { path: '**', redirectTo: '' }
  ];