import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { DueDateNaegeleRuleI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../../custom'

const DueDateNaegeleRule = (props: any) => {
  const { openDrop } = props
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(100px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
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
      <FormTabsContainer
        tabTitle1={CALCULATORS.dueDateNaegeleRule}
        animation={formAnimation}
        dropDown={true}
        openDrop={openDrop}
      >
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
              const { success, payload: dueDateNaegeleRule } = await calculateOthers(payload)
              console.log('=====>', dueDateNaegeleRule)
              if (typeof dueDateNaegeleRule === 'object') {
                const { dueDate } = dueDateNaegeleRule
                setResult({
                  dueDate: dueDate
                })
              }
              if (success === true) {
                setAnswer(success)
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
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

                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
                <CustomBtn />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>

          <div className="mb-3">
            <Typography variant="subtitle1">Due date: {Result.dueDate}</Typography>
          </div>

        </ResultTabsContainer>
      }
    </>
  )
}

export default DueDateNaegeleRule
