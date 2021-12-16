import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { ProbabilityOfASeriesOfIndpendentEventsI, ProbablityOfTwoEventsI, ProbablitySolverForTwoEventsI } from '../../../../types'
import { calculateStatistics, calculateMath } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'
import { ProbabilityOfASeriesOfIndpendentEvents, ProbablityOfTwoEvents, ProbablitySolverForTwoEvents } from "../../index";

function ProbabilityCalculator() {

  const calculators = [
    {
      tabTitle: CALCULATORS.probabilityOfASeriesOfIndpendentEvents,
      calc: <ProbabilityOfASeriesOfIndpendentEvents />
    },
    {
      tabTitle: CALCULATORS.probablityOfTwoEvents,
      calc: <ProbablityOfTwoEvents />
    },
    {
      tabTitle: CALCULATORS.probablitySolverForTwoEvents,
      calc: <ProbablitySolverForTwoEvents />
    },
  ]

  return (
    <>
      <FormTabsContainer sm={8} type="styled" calculators={calculators} />

      <ResultTabsContainer tabTitle1={'Result'} sm={4}>
        <div className="text-center mb-3">

        </div>
      </ResultTabsContainer>
    </>
  )
}

export default ProbabilityCalculator
