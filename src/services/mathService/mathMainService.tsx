import { axiosInstance, mathRoute, othersRoute } from "../axiosInstance";
import * as INTERFACES from '../types/mathTypes'
import * as FINANCE_INTERFACES from '../types/financeTypes'

export async function mathMainService(
    dataObject:
    INTERFACES.SalesCalculator|
    INTERFACES.PopulationStandardDeviationCalculator|
    INTERFACES.FibonacciCalculator|
    INTERFACES.ArithmeticSequenceCalculator|
    INTERFACES.AverageCalculator|
    INTERFACES.BinaryCalculator|
    INTERFACES.BinaryToDecimalCalculator|
    INTERFACES.CombinationsCalculator|
    INTERFACES.ConfidenceIntervalCalculator|
    INTERFACES.CubeRootCalculator|
    INTERFACES.DecimalToBinaryCalculator|
    INTERFACES.DistanceBasedOnLatitudeAndLongitudeCalculator|
    INTERFACES.ExponentCalculator|
    INTERFACES.FactorCalculator|
    INTERFACES.FinalGradeCalculator|
    INTERFACES.FractionCalculator|
    INTERFACES.FractionToDecimalCalculator|
    INTERFACES.GeneralRootCalculator|
    INTERFACES.GeometricSequencestCalculator|
    INTERFACES.GreatestCommonFactorCalculator|
    INTERFACES.GPACalculator|
    INTERFACES.GradeCalculator|
    INTERFACES.FinalGradeCalculator|
    INTERFACES.HexadecimalCalculator|
    INTERFACES.HexadecimalToDecimalCalculator|
    INTERFACES.LeastCommonMultipleCalculator|
    INTERFACES.LogCalculator|
    INTERFACES.MeanMedianModeRangeCalculator|
    INTERFACES.PercentageCalculator|
    INTERFACES.PercentageDifferenceCalculator|
    INTERFACES.PercentErrorCalculator|
    INTERFACES.PercentToFractionsCalculator|
    INTERFACES.PermutationCalculator|
    INTERFACES.PopulationStandardDeviationCalculator|
    INTERFACES.ProteinCalculator|
    INTERFACES.PythagoreanTheoremCalculator|
    INTERFACES.QuadraticFormulaCalculator|
    INTERFACES.RightAngleTriangle|
    INTERFACES.SampleStandardDeviationCalculator|
    INTERFACES.ScientificNotationCalculator|
    INTERFACES.SimplifyFractionsCalculator|
    INTERFACES.SquareRootCalculator|
    INTERFACES.StatisticsCalculator|
    INTERFACES.TwoDDistanceCalculator|
    INTERFACES.ZscoreCalculator|
    INTERFACES.MassCalculator|
    INTERFACES.MassCalculator|
    INTERFACES.DensityCalculator
   
    ){
    try{
        const { data } = await axiosInstance.post(mathRoute, dataObject);
        console.log("Data from Service")
        console.log(data)
        var msg:any = data.statusDescription;
        if(msg === "success"){
             return data
        }else{
            return false
        }
    }
    catch(error){
        console.log("Print out error")
        console.log(error)
        return error
    }
}


export async function otherMainService(
    dataObject:
    INTERFACES.ProteinCalculator|
    INTERFACES.FuelCostCalculator|
    INTERFACES.GasMileageCalculator|
    INTERFACES.ElectricityCalculator|
    INTERFACES.PregnancyWeightGainCalculator|
    INTERFACES.HeatIndexCalculatorUseRelativeHumidity|
    INTERFACES.CarbohydrateCalculator|
    INTERFACES.IdealWeightCalculator|
    INTERFACES.ArmyBodyFatCalculator|
    INTERFACES.DayOfTheWeekCalculator|
    INTERFACES.RandomPasswordGenerator
    
    ){
    try{
        const { data } = await axiosInstance.post(othersRoute, dataObject);
        console.log(data)
        var msg:any = data.statusDescription;
        if(msg === "success"){
             return data
        }else{
            return false
        }
    }
    catch(error){
        console.log(error)
        return error
    }
}

// export async function financeService(
//     dataObject
    
//     ){
//     try{
//         const { data } = await axiosInstance.post(othersRoute, dataObject);
//         console.log(data)
//         var msg:any = data.statusDescription;
//         if(msg === "success"){
//              return data
//         }else{
//             return false
//         }
//     }
//     catch(error){
//         return error
//     }
// }


export async function findIPService(
    dataObject:
    INTERFACES.FindMyIPAddress
    ){
    try{
        const { data } = await axiosInstance.post('/get-ip-address', dataObject);
        console.log(data)
        var msg:any = data.statusDescription;
        if(msg === "success"){
             return data
        }else{
            return false
        }
    }
    catch(error){
        console.log(error)
        return error
    }
}

export async function financeService(
    dataObject:
        FINANCE_INTERFACES.FutureValue|
        FINANCE_INTERFACES.ReturnOnInvestmentCalculator|
        FINANCE_INTERFACES.IncomeTaxCalculator|
        FINANCE_INTERFACES.SalesTaxCalculator|
        FINANCE_INTERFACES.DebtToIncomeCalculator
    ){
    try{
        const { data } = await axiosInstance.post('/finance', dataObject);
        console.log(data)
        var msg:any = data.statusDescription;
        if(msg === "success"){
             return data
        }else{
            return false
        }
    }
    catch(error){
        console.log(error)
        return error
    }
}