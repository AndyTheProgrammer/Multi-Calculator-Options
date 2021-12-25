import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { CurbAndGutterBarrierI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const CurbAndGutterBarrier = (props: any) => {
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
    curb_depth: '',
    curb_depth_unit: '',
    curb_height: '',
    curb_height_unit: '',
    flag_thickness: '',
    flag_thickness_unit: '',
    gutter_width: '',
    gutter_width_unit: '',
    length: '',
    length_unit: '',
    rise: '',
    quantity: '',
  })
  const [Result, setResult] = React.useState({
    concreteNeeded: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.curbAndGutterBarrier}
        animation={formAnimation}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            curb_depth,
            curb_depth_unit,
            curb_height,
            curb_height_unit,
            flag_thickness,
            flag_thickness_unit,
            gutter_width,
            gutter_width_unit,
            length,
            length_unit,
            rise,
            quantity,
          }, { setSubmitting }) => {
            const payload: CurbAndGutterBarrierI = {
              curb_depth,
              curb_depth_unit,
              curb_height,
              curb_height_unit,
              flag_thickness,
              flag_thickness_unit,
              gutter_width,
              gutter_width_unit,
              length,
              length_unit,
              rise,
              quantity,
              method: 'CurbAndGutterBarrierConcreteCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: trapSpeedMethod } = await calculateOthers(payload)
              console.log('=====>', trapSpeedMethod)
              const { concreteNeeded, unit, } = trapSpeedMethod
              if (typeof trapSpeedMethod === 'object') {
                setResult({
                  concreteNeeded: concreteNeeded,
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
                <Label title={LABELS.curbDepth} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="curb_depth"
                  placeholder={PLACEHOLDERS.number}
                  value={values.curb_depth}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="curb_depth_unit"
                  measurement="length"
                  value={values.curb_depth_unit}
                  onChange={handleChange('curb_depth_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.curbHeight} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="curb_height"
                  placeholder={PLACEHOLDERS.number}
                  value={values.curb_height}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="curb_height_unit"
                  measurement="length"
                  value={values.curb_height_unit}
                  onChange={handleChange('curb_height_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.flagThickness} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="flag_thickness"
                  placeholder={PLACEHOLDERS.number}
                  value={values.flag_thickness}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="flag_thickness_unit"
                  measurement="length"
                  value={values.flag_thickness_unit}
                  onChange={handleChange('flag_thickness_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.gutterWidth} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="gutter_width"
                  placeholder={PLACEHOLDERS.number}
                  value={values.gutter_width}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="gutter_width_unit"
                  measurement="length"
                  value={values.gutter_width_unit}
                  onChange={handleChange('gutter_width_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.length} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="length"
                  placeholder={PLACEHOLDERS.number}
                  value={values.length}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="length_unit"
                  measurement="length"
                  value={values.length_unit}
                  onChange={handleChange('length_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.rise} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="rise"
                  placeholder={PLACEHOLDERS.number}
                  value={values.rise}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.quantity} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="quantity"
                  placeholder={PLACEHOLDERS.number}
                  value={values.quantity}
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
      <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1"> Amount of concrete needed: {Result.concreteNeeded}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default CurbAndGutterBarrier
