export interface ActiveFunding
{
  Id:string,
  idInvestmentFund:string,
  nameFunding:string,
  category:string,
  price:number,

}

export interface ResponseActiveFunding
{
  remainingAmount:number,
  initialAmount:number,
  activeFunding:ActiveFunding[]
}
