export interface FibonacciCalculator{
    nthvalue: string,
    method: string
}

export interface ScientificNotationCalculator{
    value: string,
    method: string
}

export interface RightAngleTriangle{
    sideA? : string,
    sideB?: string,
    sideC? : string,
    perimeter: string,
    method: string
}

export interface MatrixCalculator{
    matrixAData: string,
    matrixBData: string,
    matrixArow: string,
    matrixBrow: string,
    matrixAcolumn: string,
    matrixBcolumn: string,
    operation: string,
    method: string
}

export interface ArithmeticSequenceCalculator{ 
    first_term:string,
    common_difference: string,
    number_of_observation: string,
    method: string
}

export interface AverageCalculator{
    numbers: string,
    method: string
}

export interface BinaryCalculator{ 
    first_value: string,
    second_value: string,
    operation: string,
    method: string
}

export interface BinaryToDecimalCalculator{ 
    value:string,
    method: string
}

export interface CombinationsCalculator{
    total_number: string,
    amount_in_each_subset: string,
    method: string
}

export interface ConfidenceIntervalCalculator{
    sample_size: string,
    sample_mean: string,
    stardard_deviation: string,
    confidence_level: string,
    method: string
}

export interface CubeRootCalculator{
    number: string,
    method: string
}

export interface DecimalToBinaryCalculator{ 
    value: string,
    method: string
}

export interface DecimalToFractionCalculator{ 
    value: string,
    method: string
}

export interface DecimalToHexadecimalCalculator{ 
    value: string,
    method: string
}

export interface DistanceBasedOnLatitudeAndLongitudeCalculator{
    latitude1: string,
    latitude2: string,
    longitude1: string,
    longitude2: string,
    method: string
}

export interface ExponentCalculator{
    base: string,
    number: string,
    method: string
}

export interface FactorCalculator{ 
    value:string,
    method: string
}

export interface FinalGradeCalculator{ 
    desired_grade: string,
    current_grade: string,
    weight_of_final: string,
    method: string
}

export interface FractionCalculator{ 
    valuea: string,
    valueb: string,
    valuec: string,
    valued: string,
    operation:string,
    method: string
}

export interface FractionToDecimalCalculator{ 
    top: string,
    bottom: string,
    method: string
}

export interface FractionToPercentageCalculator{ 
    top: string,
    bottom: string,
    method: string
}

export interface GeneralRootCalculator{
    number: string,
    root_number:string,
    method: string
}

export interface GeometricSequencestCalculator{
    common_ratio: string,
    first_term: string,
    nth_term: string,
    method: string
}

export interface GPACalculator{ 
    course: string,
    credit: string,
    grade: string,
    method: string
}

export interface GradeCalculator{ 
    entry: string,
    weight: string,
    grade: string,
    method: string
}

export interface GreatestCommonFactorCalculator{
    factors: string,
    method: string
}

export interface HexadecimalCalculator{ 
    first_value: string,
    second_value: string,
    operation: string,
    method: string
}

export interface HexadecimalToDecimalCalculator{ 
    value: string,
    method: string
}

export interface LeastCommonMultipleCalculator{
    factors: string,
    method: string
}

export interface LogCalculator{
    base: string,
    number: string,
    method: string
}

export interface MeanMedianModeRangeCalculator{
    numbers: string,
    method: string
}

export interface PercentageCalculator{
    percentage: string,
    value: string,
    confidence_level: string,
    method:string
}

export interface PercentageChangeCalculator{
    percentage: string,
    value: string,
    type: string,
    method: string
}

export interface PercentageDifferenceCalculator{
    value2: string,
    value1: string,
    method:string
}

export interface PercentErrorCalculator{
    observed_value: string,
    true_value: string,
    method: string
}

export interface PercentToFractionsCalculator{ 
    value: string,
    method: string
}

export interface PermutationCalculator{
    total_number: string,
    amount_in_each_subset: string,
    method: string
}

export interface PopulationStandardDeviationCalculator{
    provided_numbers: string,
    method: string
}

export interface ProteinCalculator{ 
    height: string,
    height_unit: string,
    weight: string,
    weight_unit: string,
    gender: string,
    age: number,
    activity: string,
    BMR_estimation_formula: string,
    method: string
}

export interface PythagoreanTheoremCalculator{
    a_value: string,
    aSquared: string,
    b_value: string,
    bSquared: string,
    c_value: string,
    cSquared: string,
    method: string
}

export interface QuadraticFormulaCalculator{
    a: string,
    b: string,
    c: string,
    method: string
}

export interface RatioCalculator{ 
    a: string,
    b: string,
    c: string,
    d: string,
    method: string
}

export interface SampleStandardDeviationCalculator{
    provided_numbers: string,
    method: string
}

export interface ScientificNotationCalculator{ 
    value: string,
    method: string
}


export interface SimplifyFractionsCalculator{ 
    valueA: string,
    valuea: string,
    valueb: string,
    method: string
}

export interface SquareRootCalculator{
    number: string,
    method: string
}

export interface StatisticsCalculator{
    observations: string,
    method: string
}

export interface TDEECalculator{ 
    height: string,
    height_unit: string,
    weight: string,
    weight_unit: string,
    gender: string,
    age: string,
    activity: string,
    BMR_estimation_formula: string,
    method: string
}

export interface TwoDDistanceCalculator{
    "x-1": string,
    "x-2": string,
    "y-1": string,
    "y-2": string,
    method: string
}

export interface ZscoreCalculator{ 
    raw_score: string,
    population_mean: string,
    standard_deviation: string,
    method: string
}

/** Transport and utilites calculator */
export interface FuelCostCalculator {
    distance: string;
    distance_unit: string;
    kilometer_per_liter: string;
    fuel_price: string;
    fuel_price_unit: string;
    method: string;
}

export interface GasMileageCalculator {
    fuel: string;
    fuel_unit: string;
    distance: string;
    distance_unit: string;
    price_per_gallon: string;
    method: string;
}

export interface ElectricityCalculator {
    power: string;
    power_unit: string;
    capacity: string;
    time: string;
    time_unit: string;
    cost: string;
    method: string;
}


/** health types */
export interface PregnancyWeightGainCalculator{
    height: string,
    height_unit: string,
    weight: string,
    weight_unit: string,
    twins: string,
    weeks:number,
    method: string
}

/** measurement types */

export interface HeatIndexCalculatorUseRelativeHumidity{
    temperature: string,
	relative_humidity: string,
	temperature_unit: string,
    method:string
}

export interface MassCalculator{
	density: string,
	volume: string,
	density_unit_a: string,
	density_unit_b: string,
	volume_unit: string,
    method: string
}

export interface DensityCalculator{
	volume_unit: string,
	volume: string,
	mass_unit: string,
	mass: string,
	density_unit_a: string,
	density_unit_b: string,
    method: string
}

/** Date and time */
export interface CarbohydrateCalculator {
    height: string;
    height_unit: string;
    weight: string;
    weight_unit: string;
    gender: string;
    age: number;
    activity: string;
    BMR_estimation_formula: string;
    method: string;
}

export interface IdealWeightCalculator {
    height: string;
    height_unit: string;
    gender: string;
    method: string;
}

export interface ArmyBodyFatCalculator {
    height: string;
    height_unit: string;
    waist: string;
    waist_unit: string;
    neck: string;
    neck_unit: string;
    hip: string;
    hip_unit: string;
    age: number;
    gender: string;
    method: string;
}

export interface DayOfTheWeekCalculator {
    date: string;
    method: string;
}

export interface RandomPasswordGenerator {
    length: string;
    method: string;
}

export interface FindMyIPAddress {
    method: string;
}

/** electricity types */
export interface HeatIndexCalculatorUseRelativeHumidity {
    temperature: string;
    relative_humidity: string;
    temperature_unit: string;
    method: string;
}

export interface MassCalculator {
    density: string;
    volume: string;
    density_unit_a: string;
    density_unit_b: string;
    volume_unit: string;
    method: string;
}

export interface DensityCalculator {
    volume_unit: string;
    volume: string;
    mass_unit: string;
    mass: string;
    density_unit_a: string;
    density_unit_b: string;
    method: string;
}

/*** laon calculators */

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