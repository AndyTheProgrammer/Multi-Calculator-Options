import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring'

import { SectorAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../../styling/CustomStyles'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  ResultTabsContainer,
  FormTabsContainer
} from '../../../../../custom'

const SectorArea = (props: any) => {
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
  const [sectorInitialValues] = React.useState({
    radius: "",
    radius_unit: "",
    angle: "",
    angle_unit: "",
  })
  const [sectorResult, setSectorResult] = React.useState({
    area: 0,
    radiusUnits: 0,
    angleUnit: 0,
    submittedradius: '',
    submitted_angle: '',
    unit: ''
  })

  const [sectorResultTwo, setSectorResultTwo] = React.useState({

  })
  const {
    formDisplay
  }: any = useStyles()

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  React.useEffect(() => {


    return () => { }
  })

  return (
    <>

      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sectorArea}
        dropDown={true}
        openDrop={openDrop}
        animation={formAnimation}
      >
        <Formik
          initialValues={sectorInitialValues}
          onSubmit={async ({
            radius,
            radius_unit,
            angle,
            angle_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: SectorAreaI = {
              radius,
              radius_unit,
              angle,
              angle_unit,
              method: 'sectorArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: sectorArea } = await calculateMath(payload)
              console.log('=====>', sectorArea)
              const {
                area,
                unitType,
                radiusUnits,
                angleUnit,
                submittedradius,
                submitted_angle,
                unit
              } = sectorArea
              if (typeof sectorArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setSectorResult({
                  area: area,
                  radiusUnits: radiusUnits,
                  angleUnit: angleUnit,
                  submitted_angle: submitted_angle,
                  submittedradius: submittedradius,
                  unit: unit,
                })
              }
              if (typeof sectorArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
              }
              if (success === true) {
                setAnswer(success)
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <FormRow>
                <Label title={LABELS.radius} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="radius_unit"
                  measurement="length"
                  value={values.radius_unit}
                  onChange={handleChange('radius_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.angle} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="angle"
                  placeholder={PLACEHOLDERS.number}
                  value={values.angle}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="angle_unit"
                  measurement="angle"
                  value={values.angle_unit}
                  onChange={handleChange('angle_unit')}
                />
              </FormRow>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>



      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer
          tabTitle={"Result"}
          latex={LATEX.sectorArea}
          animation={resultAnimation}
        >
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {sectorResult.area}{sectorResult.unit}<sup>2</sup>
            </Typography>
          </div>
        </ResultTabsContainer>
      }

    </>
  )
}

export default SectorArea
