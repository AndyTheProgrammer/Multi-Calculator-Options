// for investment and saving calculators

export interface FutureValue {
    interest_rate: string;
    starting_amount: string;
    numbe_of_periods: string;
    periodic_deposit: string;
    periodic_deposit_made_at: string;
    method: string;
}

export interface ReturnOnInvestmentCalculator {
    final_value: string;
    initial_investment: string;
    total_expenses: string;
    total_income: string;
    method: string;
}

// for money, pay, expenditure and tax calculators

export interface IncomeTaxCalculator {
    filing_status: string;
    taxable_income: number;
    method: string;
}

export interface SalesTaxCalculator {
    sales_tax_percentage: number;
    net_price: string;
    gross_price: number;
    tax_amount: string;
    method: string;
}


export interface DebtToIncomeCalculator {
    salary_and_earned_income: number;
    pension_and_social_security: number;
    investment_and_savings: number;
    other_income: number;
    rental_cost: number;
    mortgage: number;
    property_tax: number;
    other_expenses: number;
    auto_loan: number;
    credit_cards: number;
    homeowner_insurance: number;
    hoa_fees: number;
    method: string;
}

export interface VATCalculator {
    net_before_vat_price: number;
    vat_rate: string;
    final_vat_inclusive_price: string;
    method: string;
}

export interface SharedBillTipCalculator {
    price: number;
    number_of_people: number;
    tip: number;
    method: string;
}

export interface SimpleInterestCalculator {
    rate: number;
    principal: number;
    time: number;
    time_unit: string;
    interest: number;
    solve_for: string;
    method: string;
}


// Loan calculators
export interface USMortgageCalculator {
    interest_rate: number;
    total_payments_years: number;
    home_price: number;
    down_payment: number;
    down_payment_unit: string;
    property_tax_per_year: number;
    home_insurance_per_year: number;
    method: string;
}

export interface MortgageAmortiztionCalculator {
    interest_rate: number;
    total_payments_years: number;
    home_price: number;
    down_payment: number;
    down_payment_unit: string;
    property_tax_per_year: number;
    home_insurance_per_year: number;
    method: string;
}

export interface UKMortgageCalculator {
    interest_rate: number;
    total_payments_years: number;
    home_price: number;
    down_payment: number;
    down_payment_unit: string;
    property_tax_per_year: number;
    home_insurance_per_year: number;
    method: string;
}

export interface CanadianMortgageCalculator {
    interest_rate: number;
    total_payments_years: number;
    home_price: number;
    down_payment: number;
    down_payment_unit: string;
    property_tax_per_year: number;
    home_insurance_per_year: number;
    method: string;
}

// sales calculator
export interface SalesCalculator {
    price: string;
    products_solds: string;
    products_solds_unit: string;
    allowances: string;
    allowances_unit: string;
    discounts_solds: string;
    discounts_unit: string;
    sales_returns: string;
    sales_returns_unit: string;
    answer_unit: string;
    method: string;
}