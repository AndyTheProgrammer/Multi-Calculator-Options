export interface PaybackWithinTimeframeI {
  interest_rate: string;
  credit_card_balance: string;
  months: string;
  year: string;
  method: string;
}

export interface MortgagePayoffWithLoanTermI {
  interest_rate: string;
  total_payments_years: string;
  payments_made_years: string;
  loan_amount: string;
  method: string;
}

export interface MortgagePayOffWithoutLoanTermI {
  interest_rate: string;
  monthly_payment: string;
  principal_balance: string;
  method: string;
}

export interface AmortizedLoanFixedAmountI {
  interest_rate: string;
  present_value: string;
  number_of_months: string;
  number_of_years: string;
  method: string;
}

export interface DeferredPaymentsLumpsumAtMaturityI {
  interest_rate: string;
  loan_amount: string;
  number_of_years: string;
  number_of_months: string;
  method: string;
}

export interface BondPayBackPredeterminedI {
  interest_rate: string;
  predetermined_amount: string;
  number_of_years: string;
  number_of_months: string;
  method: string;
}

export interface PresentValueI {
  interest_rate: string;
  predetermined_amount: string;
  number_of_years: string;
  number_of_months: string;
  method: string;
}

export interface PresentValueOfPeriodicalDepositI {
  interest_rate: string;
  period_deposit: string;
  number_of_years: string;
  number_of_months: string;
  method: string;
}

export interface ProfitMarginCalculatorI {
  sales_revenue: string;
  cost: string;
  method: string;
}

export interface StockTradingMarginI {
  margin_requirement: string;
  stock_price: string;
  shares: string;
  method: string;
}

export interface InflationCalculatorCpiDataI {
  current_price: string;
  price_in_base: string;
  method: string;
}

export interface PayBackACertainAmountI {
  interest_rate: string;
  credit_card_balance: string;
  monthly_payment: string;
  method: string;
}

export type AllFinancialCalculators =
  | PaybackWithinTimeframeI
  | MortgagePayoffWithLoanTermI
  | MortgagePayOffWithoutLoanTermI
  | AmortizedLoanFixedAmountI
  | DeferredPaymentsLumpsumAtMaturityI
  | BondPayBackPredeterminedI
  | PresentValueI
  | PresentValueOfPeriodicalDepositI
  | ProfitMarginCalculatorI
  | StockTradingMarginI
  | InflationCalculatorCpiDataI
  | PayBackACertainAmountI;
