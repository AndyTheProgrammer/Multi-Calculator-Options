import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { ProbablityOfTwoEventsI } from '../../../types'
import { RootState } from '../../../redux/store'
import useStyles from '../../../styling/CustomStyles'
import { CALCULATORS, LABELS, PLACEHOLDERS, INPUT_TYPE } from '../../../common/shared'
import { calculateStatistics } from '../../../services/AppCalculatorsApi'
import { CustomBtn, Label, CustomForm } from '../../custom'


const ProbablityOfTwoEvents = () => {
  const classes = useStyles()
  const measures = useSelector((state: RootState) => state.unitMeasures)
  console.log(measures)
  const [initialFormValues] = React.useState({
    event_a: '',
    event_b: '',
  })
  const [Result, setResult] = React.useState({
    probability: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.probablityOfTwoEvents}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          event_a,
          event_b,
        }, { setSubmitting, resetForm }) => {
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
            resetForm()
          } catch (err) {
            console.log('====>', err)
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="form-container">

            <div className="form-row">
              <Label title={LABELS.eventA} />
              <CustomForm
                type={INPUT_TYPE.number}
                id="event_a"
                placeholder={PLACEHOLDERS.number}
                value={values.event_a}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.eventB} />
              <CustomForm
                type={INPUT_TYPE.number}
                id="event_b"
                placeholder={PLACEHOLDERS.number}
                value={values.event_b}
                onChange={handleChange}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">Probability: {Result.probability}{Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default ProbablityOfTwoEvents
