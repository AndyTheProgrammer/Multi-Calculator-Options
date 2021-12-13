import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { DueDateMittendorfWilliamI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
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

const DueDateMittendorfWilliam = () => {
  const [initialFormValues] = React.useState({
    first_date_of_last_period: '',
    type: ''
  })
  const [Result, setResult] = React.useState({
    dueDate: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.dueDateMittendorfWilliam} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            first_date_of_last_period,
            type,
          }, { setSubmitting }) => {
            const payload: DueDateMittendorfWilliamI = {
              first_date_of_last_period,
              type,
              method: 'DueDateMittendorfWilliamRule'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: dueDateMittendorf } = await calculateOthers(payload)
              console.log('=====>', dueDateMittendorf)
              if (typeof dueDateMittendorf === 'object') {
                const { dueDate } = dueDateMittendorf
                setResult({
                  dueDate: dueDate
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
                <Label title={LABELS.firstDateofLastPeriod} />
                <CustomTextInput
                  type={INPUT_TYPE.date}
                  id="first_date_of_last_period"
                  placeholder={PLACEHOLDERS.date}
                  value={values.first_date_of_last_period}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.type} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="type"
                  placeholder={PLACEHOLDERS.type}
                  value={values.type}
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
          <Typography variant="subtitle1">Due Date: {Result.dueDate} </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default DueDateMittendorfWilliam
