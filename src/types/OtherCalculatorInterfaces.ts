export interface ConcreteSquareFootingI {
  length: string;
  length_unit: string;
  width: string;
  width_unit: string;
  breadth: string;
  breadth_unit: string;
  quantity: string;
  method: string;
}

export interface CircularSlapI {
  length: string;
  length_unit: string;
  outer_diameter: string;
  outer_diameter_unit: string;
  inner_diameter: string;
  inner_diameter_unit: string;
  quantity: string;
  method: string;
}

export interface CurbAndGutterBarrierI {
  curb_depth: string;
  curb_depth_unit: string;
  curb_height: string;
  curb_height_unit: string;
  flag_thickness: string;
  flag_thickness_unit: string;
  gutter_width: string;
  gutter_width_unit: string;
  length: string;
  length_unit: string;
  quantity: string;
  method: string;
}

export interface StairsConcreateI {
  run: string;
  run_unit: string;
  rise: string;
  rise_unit: string;
  width: string;
  width_unit: string;
  platform_depth: string;
  platform_depth_unit: string;
  steps: string;
  method: string;
}

export interface HoleColumnI {
  diameter: string;
  diameter_unit: string;
  height_unit: string;
  height: string;
  quantity: string;
  method: string;
}

// new
export interface SlopeCalculatorForTwoKnownPointsI {
  y_1: string;
  y_2: string;
  x_1: string;
  x_2: string;
  method: string;
}

export interface ElapsedTimeMethodI {
  weight: string;
  weight_unit: string;
  time: string;
  time_unit: string;
  method: string;
}

export interface TrapSpeedMethodI {
  weight: string;
  weight_unit: string;
  speed: string;
  speed_unit: string;
  method: string;
}

export interface ParrallelResitorI {
  resistance_values: string;
  method: string;
}

export interface SeriesResistorI {
  resistance_values: string;
  method: string;
}

export interface ConductorResitorI {
  length: string;
  length_unit: string;
  diameter: string;
  diameter_unit: string;
  conductivity: string;
  method: string;
}

export interface HorsepowerCalculationI {
  force: string;
  force_unit: string;
  distance: string;
  distance_unit: string;
  time: string;
  time_unit: string;
  method: string;
}

export interface WebsiteBandwidthI {
  page_views: string;
  page_views_unit: string;
  page_size: string;
  page_size_unit: string;
  redundancy_factor: string;
  method: string;
}

export interface HostingBandwidthI {
  monthly_usage: string;
  monthly_usage_unit: string;
  method: string;
}
// end 11/04/2021

//note: endpoint called if 1 point and the slope are known
export interface SinglePointWithKnownSlopeI {
  y_1: string;
  distance: string;
  x_1: string;
  slope: string;
  method: string;
}

export interface BodyMassIndexI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface LeanBodyMassI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  gender: string;
  method: string;
}

export interface RegularCycleOvulationI {
  cycle_days: string;
  previous_cycle_start_date: string;
  method: string;
}

// Going down
export interface LeanBodyMassPeterFormulaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  gender: string;
  method: string;
}

export interface BodyMassIndexMethodTwoI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface BMRKatchMcArdleI {
  fat: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface BloodAlcoholContentI {
  weight_unit: string;
  weight: string;
  gender: string;
  hours_of_drinking: string;
  minutes_of_drinking: string;
  number_of_standard_drinks: string;
  method: string;
}

export interface USCustomarySystemBfcI {
  neck: string;
  neck_unit: string;
  height_unit: string;
  height: string;
  abdomen: string;
  gender: string;
  hip: string;
  hip_unit: string;
  waist: string;
  waist_unit: string;
  method: string;
}

export interface InternationalSystemBfcI {
  height: string;
  neck: string;
  gender: string;
  hip: string;
  waist: string;
  method: string;
}

export interface BodyFatPercentageBmiI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  gender: string;
  age: string;
  method: string;
}

export interface DueDateNaegeleRuleI {
  first_date_of_last_period: string;
  days: string;
  method: string;
}

export interface PeroidCalculatorI {
  start_date_of_last_cycle: string;
  cycle_length: string;
  last_period_days: string;
  method: string;
}

export interface DueDateMittendorfWilliamI {
  first_date_of_last_period: string;
  type: string;
  method: string;
}

// Done 10 from top
//Call these in your forms.
//Type Your payload using its respective type

export interface DuBoisBodySurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

//note: endpoint spelt with all I assume it should be whole
export interface WholeBodyMassFormulaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface MostellerBodySurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface HaycockBodySurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface GehanAndGeorgeSurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface BoydFormulaSurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface TakahiraBodySurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface TakaSchlichBodySurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  gender: string;
  method: string;
}

// start
export interface FujimotoFormulaSurfaceAreaI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  method: string;
}

export interface DueDateParikhsRuleI {
  first_date_of_last_period: string;
  days: string;
  method: string;
}

export interface DueDateWoodsRuleI {
  first_date_of_last_period: string;
  days: string;
  type: string;
  method: string;
}

export interface BmrMifflinJeorEquationI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  gender: string;
  age: number;
  method: string;
}

export interface BmrMifflinHarrisBenedictI {
  height: string;
  height_unit: string;
  weight: string;
  weight_unit: string;
  gender: string;
  age: number;
  method: string;
}

export type AllOtherCalculators =
  | ConcreteSquareFootingI
  | CircularSlapI
  | CurbAndGutterBarrierI
  | StairsConcreateI
  | HoleColumnI
  | SlopeCalculatorForTwoKnownPointsI
  | ElapsedTimeMethodI
  | TrapSpeedMethodI
  | ParrallelResitorI
  | SeriesResistorI
  | ConductorResitorI
  | HorsepowerCalculationI
  | WebsiteBandwidthI
  | HostingBandwidthI
  | SinglePointWithKnownSlopeI
  | BodyMassIndexI
  | LeanBodyMassI
  | RegularCycleOvulationI
  | LeanBodyMassPeterFormulaI
  | BodyMassIndexMethodTwoI
  | BMRKatchMcArdleI
  | BloodAlcoholContentI
  | USCustomarySystemBfcI
  | InternationalSystemBfcI
  | DueDateNaegeleRuleI
  | PeroidCalculatorI
  | DueDateMittendorfWilliamI
  | DuBoisBodySurfaceAreaI
  | WholeBodyMassFormulaI
  | MostellerBodySurfaceAreaI
  | HaycockBodySurfaceAreaI
  | GehanAndGeorgeSurfaceAreaI
  | BoydFormulaSurfaceAreaI
  | TakahiraBodySurfaceAreaI
  | TakaSchlichBodySurfaceAreaI
  | FujimotoFormulaSurfaceAreaI
  | DueDateParikhsRuleI
  | DueDateWoodsRuleI
  | BmrMifflinJeorEquationI
  | BmrMifflinHarrisBenedictI;
