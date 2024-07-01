
export interface Category {
  id:string,
  code:string,
  description:string
  investmentFunds: InvestmentFund[]
}

export interface InvestmentFund {
  id:string,
  code: string,
  name: string,
  description: string,
  minimumAmount: number
}
