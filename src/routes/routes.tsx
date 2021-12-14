import { HomePage } from "../components/pages/homePage"
import { ConvertersPage } from '../components/pages/convertersPage'
import TestPage from '../components/pages/testPage'
import { MathPage } from '../components/pages/mathPage'
import { MathCategories } from '../components/pages/mathCategories'
import { AllCalculators } from '../components/pages/allCalculators'
import { FinancePage } from '../components/pages/financepage'
import { OtherPage } from '../components/pages/otherPage'
import {
    AreaPageView,
    FinancePageView,
    OtherPageView,
    StatisticsPageView,
    SurfaceAreaPageView,
    VolumePageView,
    ConcreteCalculator,
    ElectronicsOrCircuitsCalculators,
    FitnessCalculators,
    HealthCalculators,
    InternetCalculators,
    TechnologyCalculators,
    TimeAndDateCalculators,
    TransportAndUtilitiesCalculators,
    UnitConversionCalculators,
    AlgebraCalculators,
    FractionsCalculators,
    GeneralMathCalculators,
    GeometryCalculators,
    MeasurementCalculators,
    StatisticsCalculators,
    InvestmentAndSavings,
    MoneyPayExpenditure,
    RetirementCalculators,
    SalesAndRetail,
    LoanCalculators
} from '../components/pages'

// converter components
import { AreaConverter, HorsePowerConverter, DataUnitConverter } from '../components/converterComponents/converters/index'

const routes = [
    {
        name: "TestPage",
        path: "/testpage",
        component: TestPage
    },
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
    },
    {
        name: "Area",
        path: "/testpage",
        component: AreaPageView
    },
    {
        name: "Finance",
        path: "/finance",
        component: FinancePageView
    },
    {
        name: "Other",
        path: "/other",
        component: OtherPageView
    },
    {
        name: "Statistics",
        path: "/statistics",
        component: StatisticsPageView
    },
    {
        name: "SurfaceArea",
        path: "/surfaceArea",
        component: SurfaceAreaPageView
    },
    {
        name: "Volume",
        path: "/volume",
        component: VolumePageView
    }
]

const financialRoutes = {}

const financial = [
    {
        name: "Volume",
        path: "/investment-and-savings-calculators",
        component: InvestmentAndSavings
    },
    {
        name: "Volume",
        path: "/loan-calculators",
        component: LoanCalculators
    },
    {
        name: "Volume",
        path: "/money-pay-expenditure-and-tax-calculators",
        component: MoneyPayExpenditure
    },
    {
        name: "Volume",
        path: "/retirement-calculators",
        component: RetirementCalculators
    },
    {
        name: "Volume",
        path: "/sales-and-retial-calculators",
        component: SalesAndRetail
    }
]

const other = [
    {
        name: "Volume",
        path: "/concrete-calculators",
        component: ConcreteCalculator
    },
    {
        name: "Volume",
        path: "/electronics-or-circuits-calculators",
        component: ElectronicsOrCircuitsCalculators
    },
    {
        name: "Volume",
        path: "/fitness-calculators",
        component: FitnessCalculators
    },
    {
        name: "Volume",
        path: "/health-calculators",
        component: HealthCalculators
    },
    {
        name: "Volume",
        path: "/internet-calculators",
        component: InternetCalculators
    },
    {
        name: "Volume",
        path: "/technology-calculators",
        component: TechnologyCalculators
    },
    {
        name: "Volume",
        path: "/time-and-date-calculators",
        component: TimeAndDateCalculators
    },
    {
        name: "Volume",
        path: "/transport-and-utilities-calculators",
        component: TransportAndUtilitiesCalculators
    },
    {
        name: "Volume",
        path: "/unit-conversion-calculators",
        component: UnitConversionCalculators
    },
]

const math = [
    {
        name: "Volume",
        path: "/algebra-calculators",
        component: AlgebraCalculators
    },
    {
        name: "Volume",
        path: "/fractions-calculators",
        component: FractionsCalculators
    },
    {
        name: "Volume",
        path: "/general-math-calculators",
        component: GeneralMathCalculators
    },
    {
        name: "Volume",
        path: "/geometry-calculators",
        component: GeometryCalculators
    },
    {
        name: "Volume",
        path: "/measurement-calculators",
        component: MeasurementCalculators
    },
    {
        name: "Volume",
        path: "/statistics-calculators",
        component: StatisticsCalculators
    }
]

const otherPageRouteName = "/otherpage"
const otherRoutes = [
    {
        name: "Area Converter",
        path: `otherPageRouteName`,
        component: AreaConverter
    },
    {
        name: "Horse Power Converter",
        path: "/otherpage/horsepowerconverter",
        component: HorsePowerConverter
    }
]
export { routes, financialRoutes, otherRoutes }