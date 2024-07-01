import { Component, Inject, OnInit, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MasterService } from '../../services/master.service';
import {MatSelectModule} from '@angular/material/select';
import { Category, InvestmentFund } from '../../model/Category';
import { Funding } from '../../model/Funding';
import { Router } from '@angular/router';
import { ActiveFunding } from '../../model/ResponseActiveFunding';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EmailResponse } from '../../model/EmailResponse';
import { ModalModel } from '../../model/ModalModel';

@Component({
  selector: 'app-popup-funding',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    MatDialogContent, MatDialogActions, MatDialogClose, MatSelectModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './popup-funding.component.html',
  styleUrl: './popup-funding.component.scss'
})


export class PopupFundingComponent  {
  public investment: ActiveFunding[] = [];
  private masterService = inject(MasterService);
  categoryControl = new FormControl('');
  categoryGroups: Category[] = [];
  investmentSelected: string ='';
  isCancelButton:Boolean = false;
  private router = inject(Router);
  public checkData: boolean = false;
  public checkForError: string = '';
  public remainingAmount: number = 0;
  public initialAmount: number = 0;
  readonly checked = false;
  public modalModel: ModalModel={
    shouldReload: false,
    sendedEmail: false
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupFundingComponent>) {

    this.masterService.getCategories().subscribe(
      {
        next:(data) => {
            this.categoryGroups = data;
        }
        ,
        error:(error) =>{
          console.log(error.message)
        }
      }
    )

  }

  ngOnInit() {
    this.investment = this.data.investmentFund as ActiveFunding[];
    this.remainingAmount = this.data.remaining;
    this.initialAmount = this.data.initialValue;

  }

  addNewFunding()
  {
    const categoryDescription = this.categoryGroups.find(y => y.investmentFunds.find(x => x.id == this.investmentSelected)  != null) ?.description;
    const investment = this.categoryGroups.flatMap(investment => investment.investmentFunds).find(x => x.id == this.investmentSelected);

    const objeto:Funding={
      Category: categoryDescription!,
      IdInvestmentFund: investment?.id!,
      NameFunding: investment?.description!,
      Price: investment?.minimumAmount!
    }
    this.masterService.AddActiveFunding(objeto).subscribe({
      next:() => {
      this.sendEmail();
      },
      error:(error) =>{
        console.log(error.message)
        this.router.navigate([''])
      }
    })
  }
  closeDialog()
  {
    this.ref.close(this.modalModel);
  }

  onSelectChange()
  {
    this.validateSelected();
    this.validateAmount();
  }

  sendEmail()
  {
    if(this.checked){
      debugger;
      this.masterService.SendEmail().subscribe({
        next:(data) => {
          this.modalModel.sendedEmail = true;
          this.modalModel.shouldReload = true;
          this.ref.close(this.modalModel);
      }
      })
    }
    else{
      this.modalModel.shouldReload = true;
      this.ref.close(this.modalModel);
    }
  }

  validateSelected()
  {
    var investmentSelect = this.investment.find(x => x.idInvestmentFund == this.investmentSelected)!;

    const investment = this.categoryGroups.flatMap(investment => investment.investmentFunds).find(x => x.id == this.investmentSelected);
    if( investmentSelect != undefined )
      {
        this.checkData = true;
        this.checkForError = `Ya estas subscrito al fondo: ${investment?.description}`;
      }
    else
    {
      this.checkData = false;
      this.checkForError =  '';

    }
  }
  validateAmount()
  {
    let sum: number = this.investment.map(a => a.price).reduce(function(a, b)
    {
      return a + b;
    });
    const investmentSelect = this.categoryGroups.flatMap(investment => investment.investmentFunds).find(x => x.id == this.investmentSelected);


    if( sum + investmentSelect?.minimumAmount! > this.initialAmount && !this.checkData )
      {
        this.checkData = true;
        this.checkForError = `No tiene saldo disponible para vincularse al fondo: ${investmentSelect?.description}`;
      }
    else if(this.remainingAmount + investmentSelect?.minimumAmount! < this.initialAmount && !this.checkData)
    {
      this.checkData = false;
      this.checkForError =  '';

    }
  }
}
