import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PopupFundingComponent } from '../popup-funding/popup-funding.component';
import { MatDialog } from '@angular/material/dialog';
import { ActiveFunding } from '../../model/ResponseActiveFunding';
import { AlertDialog } from '../alertDialog/alert-dialog.component';
import { InvestmentFund } from '../../model/Category';
import { ModalModel } from '../../model/ModalModel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private masterService = inject(MasterService);
  private router = inject(Router);
  public formBuid = inject(FormBuilder);

  public investment: ActiveFunding[] = [];
  public remainingAmount: number = 0;
  public initialAmount: number = 0;
  public displayColumns:string[] = ['nameFunding', 'category','price', 'Actions'];

  constructor(private dialog: MatDialog){

    this.masterService.getActiveFunding().subscribe(
      {
        next:(data) => {

            this.investment = data.activeFunding;
            this.remainingAmount = data.remainingAmount;
            this.initialAmount = data.initialAmount;
            console.log(data.activeFunding);
        }
        ,
        error:(error) =>{
          console.log(error.message)
        }
      }
    )
  }

  viewHistory(){
    this.router.navigate(['history-Account'])
  }

  addFunding(){
    this.Openpopup(0, 'add-Funding',PopupFundingComponent);

  }

  deleteFunding(id:string){
    console.log(id);
    this.masterService.DeleteFunding(id).subscribe({
      next:() => {

        this.dialog.open(AlertDialog, {
          data: {
            icon: 'Check',
            message: 'Retiro Exitoso',
            buttonText: 'Aceptar'
          }

        }).afterClosed().subscribe(() => {
          window.location.reload()
        });
    }
  }
    );
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
        investmentFund:  this.investment,
        remaining: this.remainingAmount,
        initialValue: this.initialAmount,
      }
    }).afterClosed().subscribe((modalModel: ModalModel) => {
      _popup.unsubscribe();
      if(modalModel.shouldReload && modalModel.sendedEmail){
        this.dialog.open(AlertDialog, {
          data: {
            icon: 'Check',
            message: 'Se envío el correo de confirmacion de la subscripción.',
            buttonText: 'Aceptar'
          }

        }).afterClosed().subscribe(() => {
          _popup.unsubscribe();
          window.location.reload()
        });
      }
      else{
        window.location.reload();
      }
    });

  }

}
