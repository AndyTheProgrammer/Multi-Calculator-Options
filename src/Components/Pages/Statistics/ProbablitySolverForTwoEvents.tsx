import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { ProbablitySolverForTwoEventsI } from '../../../Types'
import { RootState } from '../../../redux/store'
import useStyles from '../../../Styling/CustomStyles'
import { CALCULATORS, LABELS, PLACEHOLDERS, INPUT_TYPE } from '../../../Common/shared'
import { calculateStatistics } from '../../../Services/AppCalculatorsApi'
import { CustomBtn, Label, CustomTextInput } from '../../custom'

const ProbablitySolverForTwoEvents = () => {
  const classes = useStyles()
  const [initialFormValues] = React.useState({
    probability_of_a: '',
    probability_of_b: '',
    probability_of_a_not_occuring: '',
    probability_of_b_not_occuring: '',
    probability_of_a_and_b_both_occuring: '',
    probability_that_a_or_b_or_both_occur: '',
    probability_that_a_or_b_occurs_but_not_both: '',
    probability_of_neither_a_nor_b_occuring: '',
  })
  const [Result, setResult] = React.useState({
    probability: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.probablitySolverForTwoEvents}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          probability_of_a,
          probability_of_b,
          probability_of_a_not_occuring,
          probability_of_b_not_occuring,
          probability_of_a_and_b_both_occuring,
          probability_that_a_or_b_or_both_occur,
          probability_that_a_or_b_occurs_but_not_both,
          probability_of_neither_a_nor_b_occuring,
        }, { setSubmitting, resetForm }) => {
          const payload: ProbablitySolverForTwoEventsI = {
            probability_of_a,
            probability_of_b,
            probability_of_a_not_occuring,
            probability_of_b_not_occuring,
            probability_of_a_and_b_both_occuring,
            probability_that_a_or_b_or_both_occur,
            probability_that_a_or_b_occurs_but_not_both,
            probability_of_neither_a_nor_b_occuring,
            method: 'ProbabilitySolverForTwoEvents'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: probabilitySolverForTwoEvents } = await calculateStatistics(payload)
            console.log('=====>', probabilitySolverForTwoEvents)
            const { probability, unit } = probabilitySolverForTwoEvents
            if (typeof probabilitySolverForTwoEvents === 'object') {
              setResult({
                probability: probability,
                unit: unit
              })
            }
            resetForm()
          } catch (err) {
            console.log('====>', err)
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="form-container">

            <div className="form-row">
              <Label title={LABELS.probabilityOfA} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_of_a"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.probabilityOfB} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_of_b"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.probabilityOfANotOccuring} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_of_a_not_occuring"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.probabilityOfBNotOccuring} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_of_b_not_occuring"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.probabilityOfAAndBBothOccuring} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_of_a_and_b_both_occuring"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.probabilityThatAOrBOrBothOccur} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_that_a_or_b_or_both_occur"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.probabilityThatAOrBOccursButNotBoth} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_that_a_or_b_occurs_but_not_both"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.probabilityOfNeitherANorBOccuring} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="probability_of_neither_a_nor_b_occuring"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">
                Probability: {Result.probability}{Result.unit}
              </Typography>
            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default ProbablitySolverForTwoEvents
