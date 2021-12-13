import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { DueDateWoodsRuleI } from '../../../../types'
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

const DueDateWoodsRule = () => {
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    first_date_of_last_period: '',
    days: '',
    type: '',
  })
  const [Result, setResult] = React.useState({
    expectedDueDate: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.dueDateWoodsRule} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            first_date_of_last_period,
            days,
            type,
          }, { setSubmitting }) => {
            const payload: DueDateWoodsRuleI = {
              first_date_of_last_period,
              days,
              type,
              method: 'DueDateWoodsRule'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: dueDateWoodsRule } = await calculateOthers(payload)
              console.log('=====>', dueDateWoodsRule)
              if (typeof dueDateWoodsRule === 'object') {
                const { expectedDueDate } = dueDateWoodsRule
                setResult({
                  expectedDueDate: expectedDueDate,
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
          <Typography variant="subtitle1">Expected due date: {Result.expectedDueDate}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default DueDateWoodsRule
