import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { DueDateWoodsRuleI } from '../../../../../../types'
import { calculateOthers } from '../../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  HEALTH_PLACEHOLDERS,
  DUE_DATE_CALCULATORS,
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder
} from '../../../../../custom'

const DueDateWoodsRule = () => {
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
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    first_date_of_last_period: '',
    days: '',
    type: '',
  })
  const [Result, setResult] = React.useState({
    expectedDueDate: 0
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={HEALTH_PLACEHOLDERS.dueDateWoodsRule}
      />

      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.dueDateWoodsRule}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={DUE_DATE_CALCULATORS}
      >
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
              const { success, payload: dueDateWoodsRule } = await calculateOthers(payload)
              console.log('=====>', dueDateWoodsRule)
              if (typeof dueDateWoodsRule === 'object') {
                const { expectedDueDate } = dueDateWoodsRule
                setResult({
                  expectedDueDate: expectedDueDate,
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
              <FormRow>
                <Label title={LABELS.firstDateofLastPeriod} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.date}
                  id="first_date_of_last_period"
                  placeholder={PLACEHOLDERS.number}
                  value={values.first_date_of_last_period}
                  onChange={handleChange}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.days} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="days"
                  placeholder={PLACEHOLDERS.number}
                  value={values.days}
                  onChange={handleChange}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.type} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="type"
                  placeholder={PLACEHOLDERS.type}
                  value={values.type}
                  onChange={handleChange}
                />
              </FormRow>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
          <div className="mb-3">
            <Typography variant="subtitle1">
              Expected due date: {Result.expectedDueDate}
            </Typography>
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default DueDateWoodsRule
