import { Component, inject } from '@angular/core';


import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { History } from '../../model/History';
import { PopupFundingComponent } from '../popup-funding/popup-funding.component';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-history-account',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, ],
  templateUrl: './history-account.component.html',
  styleUrl: './history-account.component.scss'
})
export class HistoryAccountComponent {
  private masterService = inject(MasterService);
  private router = inject(Router);
  public formBuid = inject(FormBuilder);

  public listHistory:History[] = [];
  public displayColumns:string[] = ['NameFunding', 'Category','Amount', 'IsLinked', 'MovementDate'];

  constructor(private dialog: MatDialog){

    this.masterService.getHistory().subscribe(
      {
        next:(data) => {
          if(data.length>0){
            debugger;
            this.listHistory = data;
          }
        }
        ,
        error:(error) =>{
          console.log(error.message)
        }
      }
    )
  }


  returnHome(){
    this.router.navigate([''])
  }
}

