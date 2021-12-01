import { HomePage } from "../components/pages/homePage"
import { ConvertersPage } from '../components/pages/convertersPage'
import TestPage from '../components/pages/testPage'
import { MathPage } from '../components/pages/mathPage'
import { MathCategories } from '../components/pages/mathCategories'
import { AllCalculators } from '../components/pages/allCalculators'
import { FinancePage } from '../components/pages/financepage'
import { OtherPage } from '../components/pages/otherPage'
import { FitnessAndHealthPageView } from '../components/pages'


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
        name: "FitnessAndHealthPage",
        path: "/fitness&healthpage",
        component: FitnessAndHealthPageView
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

const financialRoutes = {

}

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