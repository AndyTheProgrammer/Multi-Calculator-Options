export interface SampleSizeI {
  confidence_level: string;
  margin_of_error: string;
  population_proportion: string;
  method: string;
}

export interface MarginErrorI {
  confidence_level: string;
  sample_size: string;
  population_proportion: string;
  method: string;
}

export interface ProbablityOfTwoEventsI {
  event_a: string;
  event_b: string;
  method: string;
}

export interface ProbablitySolverForTwoEventsI {
  probability_of_a: string;
  probability_of_b: string;
  probability_of_a_not_occuring: string;
  probability_of_b_not_occuring: string;
  probability_of_a_and_b_both_occuring: string;
  probability_that_a_or_b_or_both_occur: string;
  probability_that_a_or_b_occurs_but_not_both: string;
  probability_of_neither_a_nor_b_occuring: string;
  method: string;
}

//end 11/04/2021

export interface ProbabilityOfASeriesOfIndpendentEventsI {
  event_a: string;
  event_b: string;
  a_repeat_times: string;
  b_repeat_times: string;
  method: string;
}

export type AllStatisticalCalculators =
  | SampleSizeI
  | MarginErrorI
  | ProbablityOfTwoEventsI
  | ProbablitySolverForTwoEventsI
  | ProbabilityOfASeriesOfIndpendentEventsI;
