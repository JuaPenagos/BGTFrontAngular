import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PopupFundingComponent } from './pages/popup-funding/popup-funding.component';
import { HistoryAccountComponent } from './pages/history-account/history-account.component';

export const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"add-Funding",component:PopupFundingComponent},
  {path:"history-Account",component:HistoryAccountComponent},
];
