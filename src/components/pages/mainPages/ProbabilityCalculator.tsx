import React from 'react'
import { Formik } from 'formik'
import { Typography, Box } from '@material-ui/core'

import { NavBar2 } from '../../navbar/navbar2'
import AddLayout from '../../layouts/AddLayout'
import { SimpleDialog } from "../../content";
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../custom'
import { ProbabilityOfASeriesOfIndpendentEvents, ProbablityOfTwoEvents, ProbablitySolverForTwoEvents } from "../index";

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
      <NavBar2 pagename="Probability Calculator" />
      <AddLayout>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormTabsContainer sm={8} type="styled" calculators={calculators} />

          <ResultTabsContainer tabTitle1={'Result'} sm={4}>
            <div className="text-center mb-3">

            </div>
          </ResultTabsContainer>
        </Box>
      </AddLayout>
    </>
  )
}

export default ProbabilityCalculator
