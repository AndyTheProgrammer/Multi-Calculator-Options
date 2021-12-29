import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { ProbabilityOfASeriesOfIndpendentEventsI } from '../../../../types'
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

const ProbabilityOfASeriesOfIndpendentEvents = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    event_a: '',
    a_repeat_times: '',
    event_b: '',
    b_repeat_times: ''
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
          a_repeat_times,
          event_b,
          b_repeat_times
        }, { setSubmitting }) => {
          const payload: ProbabilityOfASeriesOfIndpendentEventsI = {
            event_a,
            a_repeat_times,
            event_b,
            b_repeat_times,
            method: 'ProbabilityOfASeriesOfIndependentEvents'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: probabilityOfASeriesOfIndependentEvents } = await calculateStatistics(payload)
            console.log('=====>', probabilityOfASeriesOfIndependentEvents)
            if (typeof probabilityOfASeriesOfIndependentEvents === 'object') {
              const { probability, unit } = probabilityOfASeriesOfIndependentEvents
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
                type={null}
                id="event_a"
                placeholder={PLACEHOLDERS.number}
                value={values.event_a}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.aRepeatTimes} />
              <CustomTextInput
                type={null}
                id="a_repeat_times"
                placeholder={PLACEHOLDERS.number}
                value={values.a_repeat_times}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.eventB} />
              <CustomTextInput
                type={null}
                id="event_b"
                placeholder={PLACEHOLDERS.number}
                value={values.event_b}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.bRepeatTimes} />
              <CustomTextInput
                type={null}
                id="b_repeat_times"
                placeholder={PLACEHOLDERS.number}
                value={values.b_repeat_times}
                onChange={handleChange}
              />
            </div>

            <div
              className="form-row"
              style={{ alignItems: 'center', justifyContent: 'space-between' }}
            >

              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </div>
          </form>
        )}
      </Formik>


      {/* Results grid */}
      {/* <ResultTabsContainer tabTitle={'Result'}>
        <div className="mb-3">
          <Typography variant="subtitle1">Probability: {Result.probability}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer> */}


    </>
  )
}

export default ProbabilityOfASeriesOfIndpendentEvents
