import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { ProbablityOfTwoEventsI } from '../../../../types'
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

const ProbablityOfTwoEvents = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    event_a: '',
    event_b: '',
  })
  const [Result, setResult] = React.useState({
    probability: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          event_a,
          event_b,
        }, { setSubmitting }) => {
          const payload: ProbablityOfTwoEventsI = {
            event_a,
            event_b,
            method: 'ProbabilityOfTwoEvents'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: probabilityOfTwoEvents } = await calculateStatistics(payload)
            console.log('=====>', probabilityOfTwoEvents)
            const { probability, unit } = probabilityOfTwoEvents
            if (typeof probabilityOfTwoEvents === 'object') {
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
              <Label title={LABELS.eventA} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="event_a"
                placeholder={PLACEHOLDERS.number}
                value={values.event_a}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.eventB} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="event_b"
                placeholder={PLACEHOLDERS.number}
                value={values.event_b}
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

      {/* Results grid */}
      {/* <ResultTabsContainer tabTitle={'Result'}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">Probability: {Result.probability}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer> */}
    </>
  )
}

export default ProbablityOfTwoEvents
