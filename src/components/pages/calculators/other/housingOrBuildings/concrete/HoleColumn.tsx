import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { HoleColumnI } from '../../../../../../types'
import { calculateOthers } from '../../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../../../custom'

const HoleColumn = (props: any) => {
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
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    diameter: "",
    diameter_unit: "",
    height: "",
    height_unit: "",
    quantity: ""
  })
  const [Result, setResult] = React.useState({
    volumeInDiameterUnit: 0,
    volumeInHeightUnit: 0,
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.holeColumn}
        animation={formAnimation}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            diameter,
            diameter_unit,
            height,
            height_unit,
            quantity,
          }, { setSubmitting }) => {
            const payload: HoleColumnI = {
              diameter,
              diameter_unit,
              height,
              height_unit,
              quantity,
              method: 'holeColumnOrRoundFootings'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: trapSpeedMethod } = await calculateOthers(payload)
              console.log('=====>', trapSpeedMethod)
              const {
                volumeInDiameterUnit,
                volumeInHeightUnit,
              } = trapSpeedMethod
              if (typeof trapSpeedMethod === 'object') {
                setResult({
                  volumeInDiameterUnit: volumeInDiameterUnit,
                  volumeInHeightUnit: volumeInHeightUnit,
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
                <Label title={LABELS.diameter} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="diameter"
                  placeholder={PLACEHOLDERS.number}
                  value={values.diameter}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="diameter_unit"
                  measurement="length"
                  value={values.diameter_unit}
                  onChange={handleChange('diameter_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.height} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="height"
                  placeholder={PLACEHOLDERS.number}
                  value={values.height}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="height_unit"
                  measurement="length"
                  value={values.height_unit}
                  onChange={handleChange('height_unit')}
                />
              </FormRow>


              <FormRow>
                <Label title={LABELS.quantity} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="quantity"
                  placeholder={PLACEHOLDERS.number}
                  value={values.quantity}
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
          <div className="mb-3 text-center">
            <Typography variant="subtitle1">
              Volume in diameter unit: {Result.volumeInDiameterUnit}
            </Typography>

            <Typography variant="subtitle1">
              Volume in height unit: {Result.volumeInHeightUnit}
            </Typography>
          </div>
        </ResultTabsContainer>
      }

    </>
  )
}

export default HoleColumn
