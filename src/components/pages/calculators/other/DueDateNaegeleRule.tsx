import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { DueDateNaegeleRuleI } from '../../../../types'
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

const DueDateNaegeleRule = () => {
  const [initialFormValues] = React.useState({
    first_date_of_last_period: '',
    days: '',
    method: '',
  })
  const [Result, setResult] = React.useState({
    dueDate: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.dueDateNaegeleRule} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            first_date_of_last_period,
            days,
            method,
          }, { setSubmitting }) => {
            const payload: DueDateNaegeleRuleI = {
              first_date_of_last_period,
              days,
              method: 'DueDateNaegeleRule'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: dueDateNaegeleRule } = await calculateOthers(payload)
              console.log('=====>', dueDateNaegeleRule)
              if (typeof dueDateNaegeleRule === 'object') {
                const { dueDate } = dueDateNaegeleRule
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
                  placeholder={PLACEHOLDERS.number}
                  value={values.first_date_of_last_period}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.days} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="days"
                  placeholder={PLACEHOLDERS.number}
                  value={values.days}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.method} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="method"
                  placeholder={PLACEHOLDERS.method}
                  value={values.method}
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
          <Typography variant="subtitle1">Due date: {Result.dueDate}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default DueDateNaegeleRule
