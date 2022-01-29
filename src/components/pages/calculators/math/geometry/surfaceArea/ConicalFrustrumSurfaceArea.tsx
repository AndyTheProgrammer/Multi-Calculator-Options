import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ConicalFrustrumSurfaceAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { conical_frustrum } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  SURFACEAREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
  Image,
  FieldContainer,
} from '../../../../../custom'

const Latex = require('react-latex');

const ConicalFrustrumSurfaceArea = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    top_radius: '',
    top_radius_unit: 'mm',
    bottom_radius: '',
    bottom_radius_unit: 'mm',
    height: '',
    height_unit: 'mm'
  })
  const [Result, setResult] = React.useState({
    totalSurfaceArea: 0,
    lateralSurfaceArea: 0,
    circularEndSurfaceArea: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    circularEndSurfaceAreaInm: 0,
    lateralSurfaceAreaInm: 0,
    totalSurfaceAreaInm: 0,
    top_radiusInm: 0,
    bottom_radiusInm: 0,
    heightInm: 0,
    circularEndSurfaceAreaInin: 0,
    lateralSurfaceAreaInin: 0,
    totalSurfaceAreaInin: 0,
    top_radiusInin: 0,
    bottom_radiusInin: 0,
    heightInin: 0,
    top_radius: '',
    top_radius_unit: '',
    bottom_radius: '',
    bottom_radius_unit: '',
    height: '',
    height_unit: '',
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.conicalFrustrumSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.conicalFrustrumSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={conical_frustrum} />
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            top_radius,
            top_radius_unit,
            bottom_radius,
            bottom_radius_unit,
            height,
            height_unit,
          }, { setSubmitting }) => {
            const payload: ConicalFrustrumSurfaceAreaI = {
              top_radius,
              top_radius_unit,
              bottom_radius,
              bottom_radius_unit,
              height,
              height_unit,
              method: 'ConicalFrustumSurfaceArea'
            }
            console.log(JSON.stringify(payload))

            try {
              const { success, payload: ConicalFrustumSurfaceArea } = await calculateMath(payload)
              console.log('=====>', ConicalFrustumSurfaceArea)

              // needs refactoring
              const {
                totalSurfaceArea,
                lateralSurfaceArea,
                circularEndSurfaceArea,
                units,
                unitType,
                circularEndSurfaceAreaInm,
                lateralSurfaceAreaInm,
                totalSurfaceAreaInm,
                top_radiusInm,
                bottom_radiusInm,
                heightInm,
                circularEndSurfaceAreaInin,
                lateralSurfaceAreaInin,
                totalSurfaceAreaInin,
                top_radiusInin,
                bottom_radiusInin,
                heightInin,
                top_radius,
                top_radius_unit,
                bottom_radius,
                bottom_radius_unit,
                height,
                height_unit,
              } = ConicalFrustumSurfaceArea
              if (typeof ConicalFrustumSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  totalSurfaceArea,
                  lateralSurfaceArea,
                  circularEndSurfaceArea,
                  units
                })
              }

              if (typeof ConicalFrustumSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  circularEndSurfaceAreaInm,
                  lateralSurfaceAreaInm,
                  totalSurfaceAreaInm,
                  top_radiusInm,
                  bottom_radiusInm,
                  heightInm,
                  circularEndSurfaceAreaInin,
                  lateralSurfaceAreaInin,
                  totalSurfaceAreaInin,
                  top_radiusInin,
                  bottom_radiusInin,
                  heightInin,
                  top_radius,
                  top_radius_unit,
                  bottom_radius,
                  bottom_radius_unit,
                  height,
                  height_unit,
                })
              }
              if (success === true) {
                setAnswer(success)
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)', alignItems: 'center', justifyContent: 'flex-start',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)', alignItems: 'center', justifyContent: 'flex-end',
                })
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <FieldContainer>
                <FormRow>
                  <Label title={LABELS.topRadius} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="top_radius"
                    placeholder={PLACEHOLDERS.number}
                    value={values.top_radius}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="top_radius_unit"
                    measurement="length"
                    value={values.top_radius_unit}
                    onChange={handleChange('top_radius_unit')}
                  />
                </FormRow>

                <FormRow>
                  <Label title={LABELS.bottomRadius} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="bottom_radius"
                    placeholder={PLACEHOLDERS.number}
                    value={values.bottom_radius}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="bottom_radius_unit"
                    measurement="length"
                    value={values.bottom_radius_unit}
                    onChange={handleChange('bottom_radius_unit')}
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
              </FieldContainer>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
          <div className='text-center'>
            {selectedResult ? (
              <div className="text-wrap">
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_circular}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_lateral}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_total}</Latex>

                <Typography variant="subtitle1">
                  Circular end SA = {Result.circularEndSurfaceArea}
                </Typography>
                <Typography variant="subtitle1">
                  Lateral SA = {Result.lateralSurfaceArea}
                </Typography>
                <Typography variant="subtitle1">
                  Total SA {Result.totalSurfaceArea}
                </Typography>
              </div>

            ) : (

              <div className="text-wrap">
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_circular}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_lateral}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_total}</Latex>

                <Typography variant="subtitle1">
                  Circular end SA = {resultTwo.circularEndSurfaceAreaInin}
                </Typography>
                <Typography variant="subtitle2">
                  or
                </Typography>
                <Typography variant="subtitle1">
                  = {resultTwo.circularEndSurfaceAreaInm}
                </Typography>

                <Typography variant="subtitle1">
                  Lateral SA = {resultTwo.lateralSurfaceAreaInin}
                </Typography>
                <Typography variant="subtitle2">
                  or
                </Typography>
                <Typography variant="subtitle1">
                  = {resultTwo.lateralSurfaceAreaInm}
                </Typography>

                <Typography variant="subtitle1">
                  Total SA = {resultTwo.totalSurfaceAreaInin}
                </Typography>
                <Typography variant="subtitle2">
                  or
                </Typography>
                <Typography variant="subtitle1">
                  = {resultTwo.totalSurfaceAreaInm}
                </Typography>
              </div>
            )}
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default ConicalFrustrumSurfaceArea
