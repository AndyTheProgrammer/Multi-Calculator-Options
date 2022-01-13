import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { DueDateMittendorfWilliamI } from '../../../../../../types'
import { calculateOthers } from '../../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  HEALTH_PLACEHOLDERS,
  DUE_DATE_CALCULATORS
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
} from '../../../../../custom'

const DueDateMittendorfWilliam = () => {
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
    type: ''
  })
  const [Result, setResult] = React.useState({
    dueDate: 0
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={HEALTH_PLACEHOLDERS.dueDateMittendorfWilliam}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.dueDateMittendorfWilliam}
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
            type,
          }, { setSubmitting }) => {
            const payload: DueDateMittendorfWilliamI = {
              first_date_of_last_period,
              type,
              method: 'DueDateMittendorfWilliamRule'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: dueDateMittendorf } = await calculateOthers(payload)
              console.log('=====>', dueDateMittendorf)
              if (typeof dueDateMittendorf === 'object') {
                const { dueDate } = dueDateMittendorf
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
              <FormRow>
                <Label title={LABELS.firstDateofLastPeriod} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.date}
                  id="first_date_of_last_period"
                  placeholder={PLACEHOLDERS.date}
                  value={values.first_date_of_last_period}
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
            <Typography variant="subtitle1">Due Date: {Result.dueDate} </Typography>
          </div>
        </ResultTabsContainer>
      }

    </>
  )
}

export default DueDateMittendorfWilliam
