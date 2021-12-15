import { HomePage } from "../components/pages/homePage"
import { ConvertersPage } from '../components/pages/convertersPage'
import TestPage from '../components/pages/testPage'
import { MathPage } from '../components/pages/mathPage'
import { MathCategories } from '../components/pages/mathCategories'
import { AllCalculators } from '../components/pages/allCalculators'
import { FinancePage } from '../components/pages/financepage'
import { OtherPage } from '../components/pages/otherPage'

import * as PC from '../components/pages/index'
import * as TPC from '../components/TemperalComponentsFolder/index'

// converter components
import { AreaConverter, HorsePowerConverter, DataUnitConverter } from '../components/TemperalComponentsFolder/index'
import { Component } from "react"
import path from "path"

const financialUrl = "/financepage"
const mathUrl = "/mathcategories"
const othersUrl = "/otherpage"

// Page routes
const routes = [
    {
        name:"TestPage",
        path: "/testpage",
        component: TestPage
    },
    {
        name:"HomePage",
        path:"/home",
        component: HomePage
    },
    {
        name:"ConvertersPage",
        path:"/converterspage",
        component: ConvertersPage
    },
    {
        name:"FinancePage",
        path:"/financepage",
        component: FinancePage
    },

    {
        name:"MathPage",
        path:"/mathpage",
        component: MathPage
    },
    {
        name:"MathCategories",
        path:"/mathcategories",
        component: MathCategories
    },
    {
        name:"OtherPage",
        path:"/otherpage",
        component: OtherPage
    },
    {
        name:"AllCalculators",
        path:"/allcalculators",
        component: AllCalculators
    }
]

//Math page routes


const mathRoutes = {
        categoryName: "Math Calculators",
        subCategories:[
              {
                name: "Fractions Calculators",
                sub_calculator: [
                  {
                    name:"TestPage",
                    path: "/testpage",
                    component: TestPage
                  },
                  {
                    name: "Fractions Calculator",
                    path: `${mathUrl}/fractionscalculator`,
                    component: TPC.FractionCalculator
                  },
                  {
                    name: "Simplifying Fractions Calculator",
                    path: `${mathUrl}/simplifyfractionscalculator`,
                    component: TPC.SimplifyFractionsCalculator
                  },
                  {
                    name: "Mixed Numbers Calculator",
                    path:`${mathUrl}/mixednumberscalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Decimal to Fraction Calculator",
                    path: `${mathUrl}/decimaltofractioncalculator`,
                    component: TPC.DecimalToBinaryCalculator
                  },
                  {
                    name: "Fraction to Decimal Calculator",
                    path: `${mathUrl}/fractiontodecimalcalculator`,
                    component: TPC.FractionToDecimalCalculator

                  },
                  {
                    name: "Fraction to Percent Calculator",
                    path: `${mathUrl}/fractiontopercentcalculator`,
                    component: TPC.FractionToPercentageCalculator
                  },
                  {
                    name: "Percent to Fractions Calculator",
                    path: `${mathUrl}/percenttofractionscalculator`,
                    component: TPC.PercentToFractionsCalculator
                  }
                ]
              },
              {
                name: "General Math Calculators",
                sub_calculator: [
                  {
                    name: "Percentage Calculator",
                    path: `${mathUrl}/percentagecalculator`,
                    component: TPC.PercentageCalculator
                  },
                  {
                    name: "Binary Calculator",
                    path:  `${mathUrl}/binarycalculator`,
                    component: TPC.BinaryCalculator
                  },
                  {
                    name: "Hexadecimal Calculator",
                    path: `${mathUrl}/hexadecimalcalculator`,
                    component: TPC.HexadecimalCalculator
                  },
                  {
                    name: "Ratio Calculator",
                    path: `${mathUrl}/ratiocalculator`,
                    component: TPC.RatioCalculator
                  },
                  {
                    name: "Least Common Multiple (LCM) Calculator",
                    path: `${mathUrl}/lcmcalculator`,
                    component: TPC.LeastCommonMultipleCalculator
                  },
                  {
                    name: "Greatest Common Factor (GCF) Calculator",
                    path:  `${mathUrl}/gcmcalculator`,
                    component: TPC.GreatestCommonFactorCalculator
                  },
                  {
                    name: "Factor Calculator",
                    path: `${mathUrl}/factorcalculator`,
                    component: TPC.FactorCalculator
                  },
                  {
                    name: "Matrix Calculator",
                    path: `${mathUrl}/matrixcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Scientific Notation Calculator",
                    path: `${mathUrl}/sncalculator`,
                    component: TPC.ScientificNotationCalculator
                  }
                ]
              },
              {
                name: "Algebra Calculators",
                sub_calculator: [
                  {
                    name: "Difference of Two Squares Calculator",
                    path: `${mathUrl}/dotscalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Quadratic Formula Calculator",
                    path: `${mathUrl}/quadformulacalculator`,
                    component: TPC.QuadraticFormulaCalculator
                  },
                  {
                    name: "Roots Calculator",
                    path: `${mathUrl}/calculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Exponent Calculator",
                    path: `${mathUrl}/expcalculator`,
                    component: TPC.ExponentCalculator
                  },
                  {
                    name: "Logarithimic Equation Calculator",
                    path:  `${mathUrl}/logcalculator`,
                    component: TPC.LogCalculator,
                  }
                ]
              },
              {
                name: "Statistics Calculators",
                sub_calculator: [
                  {
                    name: "Standard Diviation Calculator",
                    path: `${mathUrl}/stdcalcaultor`,
                    component: TPC.SampleStandardDeviationCalculator
                  },
                  {
                    name: "Fibonacci Sequency Calculator",
                    path: `${mathUrl}/fscalculator`,
                    component: TPC.FibonacciCalculator,
                  },
                  {
                    name: "Arithmetic Sequency Calculator",
                    path:`${mathUrl}/arithmeticsequencycalculator`,
                    component: TPC.ArithmeticSequenceCalculator,
                  },
                  {
                    name: "Geometric Sequency Calculator",
                    path: `${mathUrl}/geometricsequencecalculator`,
                    component: TPC.GeometricSequencestCalculator
                  },
                  {
                    name: "Sample Size Calculator",
                    path: `${mathUrl}/samplesizecalculator`,
                    component: TPC.SampleStandardDeviationCalculator
                  },
                  {
                    name: "Probability Calculator",
                    path: `${mathUrl}/probablitycalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Basic Statistics Calculator",
                    path: `${mathUrl}/basicstatscalculator`,
                    component: TPC.StatisticsCalculator
                  },
                  {
                    name: "Permutations and Combinantion Calculator",
                    path: `${mathUrl}/permutationsandcombinationscalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Z-Score Calculator",
                    path: `${mathUrl}/z-scorecalculator`,
                    component: TPC.ZscoreCalculator
                  },
                  {
                    name: "Confidence Interval Calculator",
                    path: `${mathUrl}/confidenceintervalcalculator`,
                    component: TPC.ConfidenceIntervalCalculator
                  },
                  {
                    name: "GPA  Calculator",
                    path: `${mathUrl}/gpacalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Grade Calculator",
                    path: `${mathUrl}/gradecalculator`,
                    component: PC.NoComponent
                  }
                ]
              },
              {
                name: "Geometry Calculators",
                sub_calculator: [
                  {
                    name: "Triangle Calculator",
                    path: `${mathUrl}/geometrycalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Slope (Gradent) Calculator",
                    path: `${mathUrl}/slopecalculator`,
                    component: PC.SlopeCalculatorForTwoKnownPoints
                  },
                  {
                    name: "Area Calculator",
                    path: `${mathUrl}/areacalculator`,
                    component: PC.Area
                  },
                  {
                    name: "Distance Calculator",
                    path: `${mathUrl}/distancecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Circle Calculator",
                    path: `${mathUrl}/circlecalculator`,
                    component: PC.CircleArea
                  },
                  {
                    name: "Surface Area Calculator",
                    path:`${mathUrl}/surfaceareacalculator`,
                    component: PC.SurfaceArea
                  },
                  {
                    name: "Pythagoras Theorem Calculator",
                    path: `${mathUrl}/pythagorascalculator`,
                    component: PC.NoComponent
                  }
                ]
              },
              {
                name: "Measurements Calculators",
                sub_calculator: [
                  {
                    name: "Density Calculator",
                    path: `${mathUrl}/densitycalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Mass Calculator",
                    path: `${mathUrl}/mathcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Weight Calculator",
                    path: `${mathUrl}/weightcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Volume Calculator",
                    path: `${mathUrl}/densitycalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Height Calculator",
                    path: `${mathUrl}/heightcalculator`,
                    component: PC.NoComponent                  
                  },
                  {
                    name: "Bra Size Calculator",
                    path: `${mathUrl}/brasizecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Heat Index Calculator",
                    path: `${mathUrl}/heatindexcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Dew Point Calculator",
                    path: `${mathUrl}/dewpointcalculator`,
                    component: PC.NoComponent
                  }
                ]
              }
        ]
    }

//financial page routes

const financialRoutes =
    {
        categoryName: "Financial Calculators",
        subCategories:[
                  {
                    name: "Investment and Saving Calculators",
                    sub_calculator: [
                      {
                        name: "Interest Calculator",
                        path: `${financialUrl}/interestcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Interest Rate Calculator",
                        path: `${financialUrl}/interestratecalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Compund Interest Calculator",
                        path: `${financialUrl}/compoundinterestcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Savings Calculator",
                        path: `${financialUrl}/savingscalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Certificate of Deposit (CD) Calculator",
                        path: `${financialUrl}/cdculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Return on Investment (ROI) Calculator",
                        path: `${financialUrl}/roicalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Payback Back Period Calculator",
                        path: `${financialUrl}/paybackperiodinterestcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Inestiment Inflation Calculator",
                        path: `${financialUrl}/inestimentinflationcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Present Value Calculator",
                        path: `${financialUrl}/presentvaluecalculator`,
                        component: PC.PresentValue
                      }
                    ]
                  },
                  {
                    name: "Money, Pay, Expenditure & Tax Calculators",
                    sub_calculator: [
                      {
                        name: "Income Tax Calculator",
                        path: `${financialUrl}/incometaxcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Salary (Gross Pay) Calculator",
                        path: `${financialUrl}/salarycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "US Paycheck Calculator",
                        path: `${financialUrl}/uspaycheckcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Eastate Tax Calculator",
                        path: `${financialUrl}/eastatetaxcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "TIP Calculator",
                        path: `${financialUrl}/tipcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Currency Calculator",
                        path: `${financialUrl}/currencycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Time Card Calculator",
                        path: `${financialUrl}/timecardcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Depreciation Calculator",
                        path: `${financialUrl}/depreciationcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "CPI Inflation (US) Calculator",
                        path: `${financialUrl}/cpiinflationcalculator`,
                        component: PC.InflationCalculatorCpiData,
                      },
                      {
                        name: "Budget Calculator",
                        path: `${financialUrl}/budgetcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Value Added Tax (VAT) Calculator",
                        path: `${financialUrl}/vatcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "College Cost Calculator",
                        path: `${financialUrl}/collegecalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Sales Tax Calculator",
                        path: `${financialUrl}/salestaxcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Debt-to-Income Ratio Calculator",
                        path: `${financialUrl}/debttoincomeratiocalculator`,
                        component: PC.NoComponent
                      }
                    ]
                  },
                  {
                    name: "Loan Calculators: Mortgage, Auto, Real Estate & Others",
                    sub_calculator: [
                      {
                        name: "Income Tax Calculator",
                        path: `${financialUrl}/incometaxcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Repayment Calculator",
                        path: `${financialUrl}/repaymentcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Mortgage (US) Calculator",
                        path: `${financialUrl}/mortgageuscalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Mortgage (UK) Calculator",
                        path: `${financialUrl}/mortgageukcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Mortgage (Canada) Calculator",
                        path: `${financialUrl}/mortgagecanadacalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Mortgage Payoff Calculator",
                        path: `${financialUrl}/mortgagepayoffcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Mortgage Annual Percentage Rate Calculator",
                        path: `${financialUrl}/mortgageannualpercentageratecalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Mortgage Amortization Calculator",
                        path: `${financialUrl}/mortgageamortizationcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "House Affordability Calculator",
                        path: `${financialUrl}/houseaffordabilitycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Rent Affordability Calculator",
                        path: `${financialUrl}/rentaffordabilitycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Refinancing Calculator",
                        path: `${financialUrl}/refinancingcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Rent Property Calculator",
                        path: `${financialUrl}/rentpropertycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "FHA Mortgage Calculator",
                        path: `${financialUrl}/fhamortgagecalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "VA Home Loan Calculator",
                        path: `${financialUrl}/vahomeloadcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Rent vs Buy Calculator",
                        path: `${financialUrl}/rentvsbuycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Auto Loan Calculator",
                        path: `${financialUrl}/autoloadcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Auto Lease Calculator",
                        path: `${financialUrl}/autoleasecalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Credit Card Payoff Calculator",
                        path: `${financialUrl}/creditcardpayoffcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Debt Payoff Calculator",
                        path: `${financialUrl}/debtpayoffcalculator`,
                        component: PC.NoComponent
                      }
                    ]
                  },
                  {

                    name: "Retirement Calculators ",
                    sub_calculator: [
                      {
                        name: "Retirement Calculator",
                        path: `${financialUrl}/retirementcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "401K Calculator",
                        path: `${financialUrl}/401kcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Pension Calculator",
                        path: `${financialUrl}/pensioncalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Social Security Calculator",
                        path: `${financialUrl}/socialsecuritycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Annunity Calculator",
                        path: `${financialUrl}/annunitycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Annunity Payoff Calculator",
                        path: `${financialUrl}/annunitypayoffcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Roth IRA Calculator",
                        path: `${financialUrl}/rothiracalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "IRA Calculator",
                        path: `${financialUrl}/iracalculator`,
                        component: PC.NoComponent
                      }
                    ]
                  },
                  {
                    name: "Sales and Retail Calculators",
                    sub_calculator: [
                      {
                        name: "Sales Calculator",
                        path: `${financialUrl}/calculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Margin Calculator",
                        path: `${financialUrl}/margincalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Markup Calculator",
                        path: `${financialUrl}/markupcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Markup vs Margin Calculator",
                        path: `${financialUrl}/markupvsmargincalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Margin vs Markup Calculator",
                        path: `${financialUrl}/marginvsmarkupcalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Discount Calculator",
                        path: `${financialUrl}/discountcalculator`,
                        component: PC.NoComponent
                      }
                    ]
                  }
        
        ]
    }

//  Others page route

const othersRoutes = {
        categoryName: "Others Calculators",
        subCategories:[
              {
                name: "Fitness Calculator",
                sub_calculator:[
                    {
                        name: "Body Mass Index (BMI) Calculator",
                        path:  `${othersUrl}/bodymassindex`,
                        component: PC.BodyMassIndex
                    },
                    {
                        name: "Calorie Calculator",
                        path: `${othersUrl}/caloriecalculator`,
                        component: PC.NoComponent
                    },
                    {
                        name: "Body Fat Calc + Army Body Fat",
                        path: `${othersUrl}/bodyfatarmycalculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Basal Metabolic Rate (BMR) Calculator",
                        path: `${othersUrl}/calculator`,
                        component: PC.NoComponent
                      },
                      {
                        name: "Lean Body Mass Calculator",
                        path: `${othersUrl}/leanbodymasscalculator`,
                        component: PC.LeanBodyMass
                      },
                      {
                        name: "Ideal Body Weight Calculator",
                        path: `${othersUrl}/idealbodyweightcalculator`,
                        component: PC.NoComponent
                      }
                ]
              },
              {
                name: "Health Calculators",
                sub_calculator: [
                  {
                    name: "Pregnancy Due Date Calculator",
                    path: `${othersUrl}/pregnancyduedatecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Pregnancy Weight Gain Calculator",
                    path: `${othersUrl}/pregnancyweightgaincalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Ovulation Calculator",
                    path: `${othersUrl}/ovulationcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Period Calculator",
                    path: `${othersUrl}/periodcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Macro Calculator",
                    path: `${othersUrl}/macrocalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Carbohydrate Intake Calculator",
                    path: `${othersUrl}/carbohydrateintakecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Protein Intake Calculator",
                    path: `${othersUrl}/proteinintakecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Fat Intake Calculator",
                    path: `${othersUrl}/fatintakecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Total Daily Energy Expenditure (TDEE) Calculator",
                    path: `${othersUrl}/totaldailyenergycalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Body Surface Area Calculator",
                    path: `${othersUrl}/bodysurfaceareacalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Blood Alcohol Content (BAC) Calculator",
                    path: `${othersUrl}/baccalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "HIV Window Period Calculator",
                    path: `${othersUrl}/hivwindowperiodcalculator`,
                    component: PC.NoComponent
                  }
                ]
              },
              {
               
                name: "Time and Date Calculators",
                sub_calculator: [
                  {
                    name: "Time Zone Calculator",
                    path: `${othersUrl}/timezonecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Day & Time Calculator",
                    path: `${othersUrl}/dayandtimecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Day of the Week Calculator",
                    path: `${othersUrl}/dayofweekcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Age Calculator",
                    path: `${othersUrl}/agecalculator`,
                    component: PC.NoComponent
                  }
                ]
              },
              {
                name: "Technology Calculators",
                sub_calculator: [
                  {
                    name: "IP Address Calculator",
                    path: `${othersUrl}/ipaddresscalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Data Storage Calculator",
                    path: `${othersUrl}/datastoragecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "IP Subnet Calculator",
                    path: `${othersUrl}/ipsubnetcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Bandwidth Calculator",
                    path: `${othersUrl}/calculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Random Password Generator Calculator",
                    path: `${othersUrl}/randompasswodgeneratorcalculator`,
                    component: PC.NoComponent
                  }
                ]
              },
              {
                name: "Transport and Utilities Calculators",
                sub_calculator: [
                  {
                    name: "Gas Mileage Calculator",
                    path: `${othersUrl}/gasmileagecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Fuel Cost Calculator",
                    path: `${othersUrl}/fuelcostcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Mileage Calculator",
                    path: `${othersUrl}/mileagecalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Electrity Cost Calculator",
                    path: `${othersUrl}/electricitycostcalculator`,
                    component: PC.NoComponent
                  },
                  {
                    name: "Horsepower Calc + Engine Horsepower Calculator",
                    path: `${othersUrl}/enginehorsepowercalculator`,
                    component: PC.HorsepowerCalculation
                  }
                ]
              },
              {
                name: "Unit Conversion Calculators",
                sub_calculator: [
                  {
                    name: "Length Converter",
                    path: `${othersUrl}/lengthconvertercalculator`,
                    component: TPC.LengthConverter
                  },
                  {
                    name: "Temperature Converter",
                    path: `${othersUrl}/temperaturecalculator`,
                    component: TPC.TemperatureConverter
                  },
                 
                  {
                    name: "Area Converter",
                    path: `${othersUrl}/arecalculator`,
                    component: TPC.AreaConverter
                  },
                  {
                    name: "Volume Converter",
                    path: `${othersUrl}/volumecalculator`,
                    component: TPC.VolumeConverter
                  },
                  {
                    name: "Weight Converter",
                    path: `${othersUrl}/weightcalculator`,
                    component: TPC.WeightConverter
                  },
                  {
                    name: "Horsepower Converter",
                    path: `${othersUrl}/horsepowercalculator`,
                    component: TPC.HorsePowerConverter
                  },
                  {
                    name: "Time Converter",
                    path: `${othersUrl}/timecalculator`,
                    component: TPC.TimeConverter
                  }
                ]
              }
        ]
    }

const otherPageRouteName = "/otherpage"
const otherRoutes = [
    {
        name:"Area Converter",
        path:  '/otherpage/otherPageRouteName',
        component: AreaConverter
    },
    {
        name: "Horse Power Converter",
        path: "/otherpage/horsepowerconverter",
        component: HorsePowerConverter
    }
]
export { routes, financialRoutes, otherRoutes, mathRoutes, othersRoutes }