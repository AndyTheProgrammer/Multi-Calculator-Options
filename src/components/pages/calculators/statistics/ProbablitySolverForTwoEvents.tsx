import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { ProbablitySolverForTwoEventsI } from '../../../../types'
import { calculateStatistics } from '../../../../services/AppCalculatorsApi'
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

const ProbablitySolverForTwoEvents = (props: any) => {
  const { openDrop } = props
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
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.probablitySolverForTwoEvents}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
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
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">

              <div className="form-row">
                <Label title={LABELS.probabilityOfA} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_of_a"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_of_a}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.probabilityOfB} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_of_b"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_of_b}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.probabilityOfANotOccuring} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_of_a_not_occuring"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_of_a_not_occuring}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.probabilityOfBNotOccuring} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_of_b_not_occuring"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_of_b_not_occuring}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.probabilityOfAAndBBothOccuring} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_of_a_and_b_both_occuring"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_of_a_and_b_both_occuring}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.probabilityThatAOrBOrBothOccur} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_that_a_or_b_or_both_occur"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_that_a_or_b_or_both_occur}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.probabilityThatAOrBOccursButNotBoth} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_that_a_or_b_occurs_but_not_both"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_that_a_or_b_occurs_but_not_both}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.probabilityOfNeitherANorBOccuring} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="probability_of_neither_a_nor_b_occuring"
                  placeholder={PLACEHOLDERS.number}
                  value={values.probability_of_neither_a_nor_b_occuring}
                  onChange={handleChange}
                />
              </div>

              <div
                className="form-row"
                style={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <CustomBtn />
                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">
            Probability: {Result.probability}{Result.unit}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default ProbablitySolverForTwoEvents
