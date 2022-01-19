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

const mathUrl = "/mathcategories"

// Page routes
const routes = [
  // {
  //     name:"TestPage",
  //     path: "/testpage",
  //     component: TestPage
  // },
  {
    name: "HomePage",
    path: "/home",
    component: HomePage
  },
  {
    name: "ConvertersPage",
    path: "/converterspage",
    component: ConvertersPage
  },
  {
    name: "FinancePage",
    path: "/financepage",
    component: FinancePage
  },

  {
    name: "MathPage",
    path: "/mathpage",
    component: MathPage
  },
  {
    name: "MathCategories",
    path: "/mathcategories",
    component: MathCategories
  },
  {
    name: "OtherPage",
    path: "/otherpage",
    component: OtherPage
  },
  {
    name: "AllCalculators",
    path: "/allcalculators",
    component: AllCalculators
  }
]

//Math page routes


const mathRoutes = {
  categoryName: "Math Calculators",
  subCategories: [
    {
      name: "General Math Calculators",
      sub_calculator: [
        {
            name: "Fractions",
            path: `${mathUrl}/fractions`,
            component: TPC.NoComponent
        },
        {
          name: "Percentage",
          path: `${mathUrl}/percentagecalculator`,
          component: TPC.PercentageCalculator
        },
        {
          name: "Binary Number System",
          path: `${mathUrl}/binarycalculator`,
          component: TPC.BinaryCalculators
        },
        {
          name: "Hexadecimal Number System",
          path: `${mathUrl}/hexadecimalcalculator`,
          component: TPC.HexadecimalCalculators
        },
        {
          name: "Ratio and Proportion",
          path: `${mathUrl}/ratiocalculator`,
          component: TPC.RatioCalculator
        },
        {
          name: "Factors And Factors",
          path: `${mathUrl}/factorsandmultiples`,
          component: TPC.NoComponent
        },
        {
          name: "Scientific Notation",
          path: `${mathUrl}/sncalculator`,
          component: TPC.ScientificNotationCalculator
        },
        {
            name: "Exponent Calculator",
            path: `${mathUrl}/expcalculator`,
            component: TPC.ExponentCalculator
        },
        {
            name: "Logarithimic Equation Calculator",
            path: `${mathUrl}/logcalculator`,
            component: TPC.LogCalculator,
        }
      ]
    },
    {
      name: "Algebra Calculators",
      sub_calculator: [
        {
            name: "Quadratic Formula",
            path: `${mathUrl}/quadformulacalculator`,
            component: TPC.QuadraticFormulaCalculator
        },
        {
            name: "Roots",
            path: `${mathUrl}/calculator`,
            component: TPC.RootsCalculators
        },
        // {
        //     name: "Matrix",
        //     path: `${mathUrl}/matrix`,
        //     component: TPC.NoComponent
        // }
      ]
    },
    {
      name: "Statistics Calculators",
      sub_calculator: [
        {
          name: "Standard Diviation Calculator",
          path: `${mathUrl}/stdcalcaultor`,
          component: TPC.StandardDeviationCalculators
        },
        {
          name: "Sequence And Series",
          path: `${mathUrl}/sequenceandseries`,
          component: TPC.FibonacciCalculator,
        },
        {
          name: "Sample Size Calculator",
          path: `${mathUrl}/samplesizecalculator`,
          component: PC.SampleSizeCalculator
        },
        {
          name: "Probability Calculator",
          path: `${mathUrl}/probablitycalculator`,
          component: PC.ProbabilityCalculator
        },
        {
          name: "Basic Statistics Calculator",
          path: `${mathUrl}/basicstatscalculator`,
          component: TPC.StatisticsCalculator
        },
        {
          name: "Permutations and Combinantion Calculator",
          path: `${mathUrl}/permutationsandcombinationscalculator`,
          component: TPC.PermutationsAndCombination
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
          name: "Grades And GPA",
          path: `${mathUrl}/gradesandgpa`,
          component: TPC.GPACalculator
        }
      ]
    },
    {
      name: "Geometry Calculators",
      sub_calculator: [
        {
          name: "Gradient Of A curve",
          path: `${mathUrl}/slopecalculator`,
          component: PC.SlopeCalculator
        },
        {
          name: "Area Of 2D Shapes",
          path: `${mathUrl}/areacalculator`,
          component: PC.AreaCalculator
        },
        {
          name: "Distance Calculator",
          path: `${mathUrl}/distancecalculator`,
          component: PC.NoComponent
        },
        {
          name: "Area of 3D Shapes",
          path: `${mathUrl}/surfaceareacalculator`,
          component: PC.SurfaceAreaCalculator
        },
        {
          name: "Pythagoras Theorem ",
          path: `${mathUrl}/pythagorascalculator`,
          component: PC.NoComponent
        }
      ]
    }
  ]
}


export { routes, mathRoutes }