import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper, List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import useStyles from '../../../../styling/CustomStyles'
import { calculateMath } from '../../../../services/AppCalculatorsApi'
import { Font, FontProvider } from "../../../font";
import geometry_icon from '../../../../common/assets/geometry_icon.svg';
import {
  CircleAreaI,
  EllipseAreaI,
  ParallelogramAreaI,
  RectangleAreaI,
  SectorAreaI,
  TrapezoidAreaI,
  TriangleAreaI,
} from '../../../../types'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormRow,
  FormTabsContainer,
  Image,
  PlaceHolder,
  ResultTabsContainer,
} from '../../../custom'
import {
  circle,
  ellipse,
  parallelogram,
  rectangle,
  sector,
  trapezoid,
  triangle,
} from "../../../../common/assets/images"

const Latex = require('react-latex');

function TestCalculator() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation, initial values
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(100px)' : 'translateX(0px)',
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
  const [selectedResult, setSelectedResult] = React.useState<boolean>(false)

  // Open dropdown
  const [open, setOpen] = React.useState(false);
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("Circle Area");

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = (value: any) => {
    setOpen(false)
    if (value) {
      setSelectedCalc(value)

      // find calcName that matches the selected calc
      const getCalc = calculators.find(({ calcName }) => calcName === value)
      setCurrentCalc(getCalc!)
    }
  };

  // INITIAL VALUES

  // Cirlce
  const [circleInitialValues] = React.useState({
    radius: "25",
    radius_unit: "",
  })
  const [circleResult, setCircleResult] = React.useState({
    area: 0,
    units: '',
    Submitted_radius: '',
    Submitted_unit: ''
  })

  // Ellipse
  const [ellipseInitialValues] = React.useState({
    semi_major_axes_a: "",
    semi_major_axes_a_unit: "",
    semi_major_axes_b: "",
    semi_major_axes_b_unit: "",
  })
  const [ellipseResult, setEllipseResult] = React.useState({
    semi_major_axes_a: 0,
    semi_major_axes_b: 0,
    area: 0,
    unit: ''
  })
  const [ellipseResultTwo, setEllipseResultTwo] = React.useState({
    areaInsemi_major_axes_aUnit: 0,
    areaInsemi_major_axes_bUnit: 0,
    semi_major_axes_aInsemi_major_axes_bUnit: 0,
    $semi_major_axes_bInsemi_major_axes_aUnit: 0,
    submittedsemi_major_axes_a: 0,
    submitted_semi_major_axes_b: 0,

  })

  // Parallelogram
  const [parallelogramInitialValues] = React.useState({
    breadth: '',
    breadth_unit: '',
    height: '',
    height_unit: ''
  })
  const [parallelogramResult, setParallelogramResult] = React.useState({
    area: 0,
    breadth: 0,
    height: 0,
    unit: ''
  })
  const [parallelogramResultTwo, setParallelogramResultTwo] = React.useState({
    areaInbreadthUnit: 0,
    areaInheightUnit: 0,
    breadthInheightUnit: 0,
    $heightInbreadthUnit: 0,
    submittedbreadth: 0,
    submitted_height: 0,
    unit: ''
  })

  // Rectangle
  const [rectInitialValues] = React.useState({
    length: '',
    length_unit: '',
    width: '',
    width_unit: '',
  })
  const [rectResult, setRectResult] = React.useState({
    area: 0,
    submittedLength: 0,
    submitted_width: 0,
    units: ''
  })

  const [rectResultTwo, setRectResultTwo] = React.useState({
    areaInLengthUnit: 0,
    areaInWidthUnit: 0,
    lengthInWidthUnit: 0,
    $widthInlengthUnit: 0,
    submittedLength: '',
    submitted_width: ''
  })

  // Sector
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

  // Trapezoid
  const [trapezoidInitialValues] = React.useState({
    base1: "",
    base1_unit: "",
    base2: "",
    base2_unit: "",
    height: "",
    height_unit: "",
  })
  const [trapezoidResult, setTrapezoidResult] = React.useState({
    area: 0,
    base1: 0,
    base2: 0,
    height: 0,
    unit: ''
  })
  const [trapezoidResultTwo, setTrapezoidResultTwo] = React.useState({
    areaInm: 0,
    base1tom: 0,
    base2tom: 0,
    heighttom: 0,
    areaIncm: 0,
    base1tocm: 0,
    base2tocm: 0,
    heighttocm: 0,
  })

  // Triangle
  const [triangleInitialValues] = React.useState({
    sideA: "",
    sideA_unit: "",
    sideB: "",
    sideB_unit: "",
    sideC: "",
    sideC_unit: "",
  })
  const [triangleResult, setTriangleResult] = React.useState({
    area: 0,
    sideA: 0,
    sideB: 0,
    sideC: 0,
    unit: ''
  })
  const [triangleResult2, setTriangleResult2] = React.useState({
    areaInLenghtUnit: 0,
    areaInWidthUnit: 0,
    unit: ''
  })

  // main state
  const [currentCalc, setCurrentCalc] = React.useState({
    calcName: "Circle Area",
    placeholder: <PlaceHolder
      placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
    />,
    image: <Image path={circle} />,
    form: <Formik
      initialValues={circleInitialValues}
      onSubmit={async ({
        radius,
        radius_unit
      }, { setSubmitting }) => {
        const payload: CircleAreaI = {
          radius,
          radius_unit,
          method: 'circleArea'
        }
        console.log(JSON.stringify(payload))
        try {
          const { success, payload: circleArea } = await calculateMath(payload)
          console.log('=====>', circleArea)

          if (typeof circleArea === 'object') {
            const { area, units, submittedradius, submittedunit } = circleArea
            setCircleResult({
              area: area,
              units: units,
              Submitted_radius: submittedradius,
              Submitted_unit: submittedunit
            })
          }
          if (success === true) {
            setAnswer(success)
            formApi.start({
              transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
            });
            resultApi.start({
              transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
            })
          }
          console.log("VALUE: ", success)
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
              placeholder=''
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

          <FormRow buttons>
            <CustomResetBtn
              onHandleClick={() => resetForm()}
            />
            <CustomBtn />
          </FormRow>
        </form>
      )}
    </Formik>,
    result: <div className="text-wrap text-center">
      <p style={{ fontSize: 14 }}>
        <Latex displayMode={true}>{LATEX.cirleArea}</Latex>
      </p>
      <Typography variant="subtitle1">
        = {circleResult.area}{circleResult.units}<sup>2</sup>
      </Typography>
    </div>
  });

  // Array of calculator forms and their results.
  const calculators = [
    {
      calcName: "Circle Area",
      placeholder: <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />,
      image: <Image path={circle} />,
      form: <Formik
        initialValues={circleInitialValues}
        onSubmit={async ({
          radius,
          radius_unit
        }, { setSubmitting }) => {
          const payload: CircleAreaI = {
            radius,
            radius_unit,
            method: 'circleArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { success, payload: circleArea } = await calculateMath(payload)
            console.log('=====>', circleArea)

            if (typeof circleArea === 'object') {
              const { area, units, submittedradius, submittedunit } = circleArea
              setCircleResult({
                area: area,
                units: units,
                Submitted_radius: submittedradius,
                Submitted_unit: submittedunit
              })
            }
            if (success === true) {
              setAnswer(success)
              formApi.start({
                transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
              });
              resultApi.start({
                transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
              })
            }
            console.log("VALUE: ", success)
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
                placeholder=''
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

            <FormRow buttons>
              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </FormRow>
          </form>
        )}
      </Formik>,
      result: <div className="text-wrap text-center">
        <p style={{ fontSize: 14 }}>
          <Latex displayMode={true}>{LATEX.cirleArea}</Latex>
        </p>
        <Typography variant="subtitle1">
          = {circleResult.area}{circleResult.units}<sup>2</sup>
        </Typography>
      </div>
    },
    {
      calcName: "Ellipse Area",
      placeholder: <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />,
      image: <Image path={ellipse} />,
      form: <Formik
        initialValues={ellipseInitialValues}
        onSubmit={async ({
          semi_major_axes_a,
          semi_major_axes_a_unit,
          semi_major_axes_b,
          semi_major_axes_b_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: EllipseAreaI = {
            semi_major_axes_a,
            semi_major_axes_a_unit,
            semi_major_axes_b,
            semi_major_axes_b_unit,
            method: 'ellipseArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { success, payload: ellipseArea } = await calculateMath(payload)
            console.log('=====>', ellipseArea)
            const {
              area,
              units,
              semi_major_axes_a,
              semi_major_axes_b, unitType,
              areaInsemi_major_axes_aUnit,
              areaInsemi_major_axes_bUnit,
              semi_major_axes_aInsemi_major_axes_bUnit,
              $semi_major_axes_bInsemi_major_axes_aUnit,
              submittedsemi_major_axes_a,
              submitted_semi_major_axes_b,

            } = ellipseArea
            if (typeof ellipseArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setEllipseResult({
                area: area,
                semi_major_axes_a: semi_major_axes_a,
                semi_major_axes_b: semi_major_axes_b,
                unit: units
              })
            }
            if (typeof ellipseArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setEllipseResultTwo({
                areaInsemi_major_axes_aUnit: areaInsemi_major_axes_aUnit,
                areaInsemi_major_axes_bUnit: areaInsemi_major_axes_bUnit,
                semi_major_axes_aInsemi_major_axes_bUnit: semi_major_axes_aInsemi_major_axes_bUnit,
                $semi_major_axes_bInsemi_major_axes_aUnit: $semi_major_axes_bInsemi_major_axes_aUnit,
                submitted_semi_major_axes_b: submitted_semi_major_axes_b,
                submittedsemi_major_axes_a: submittedsemi_major_axes_a
              })
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
              <Label title={LABELS.semiMajorAxesA} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="semi_major_axes_a"
                placeholder={PLACEHOLDERS.number}
                value={values.semi_major_axes_a}
                onChange={handleChange}
              />

              <CustomSelect
                id="semi_major_axes_a_unit"
                measurement="length"
                value={values.semi_major_axes_a_unit}
                onChange={handleChange('semi_major_axes_a_unit')}
              />
            </FormRow>

            <FormRow>
              <Label title={LABELS.semiMajorAxesB} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="semi_major_axes_b"
                placeholder={PLACEHOLDERS.number}
                value={values.semi_major_axes_b}
                onChange={handleChange}
              />

              <CustomSelect
                id="semi_major_axes_b_unit"
                measurement="length"
                value={values.semi_major_axes_b_unit}
                onChange={handleChange('semi_major_axes_b_unit')}
              />
            </FormRow>

            <FormRow buttons>
              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </FormRow>
          </form>
        )
        }
      </Formik >,
      result: <div className="text-wrap text-center">
        <p style={{ fontSize: 14 }}>
          <Latex displayMode={true}>{LATEX.ellipseArea}</Latex>
        </p>
        {selectedResult === true &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {ellipseResult.area}{ellipseResult.unit}<sup>2</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {ellipseResultTwo.areaInsemi_major_axes_aUnit}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle1">
              = {ellipseResultTwo.areaInsemi_major_axes_bUnit}<sup>2</sup>
            </Typography>
          </div>
        }
      </div>
    },
    {
      calcName: "Parallelogram Area",
      placeholder: <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />,
      image: <Image path={parallelogram} />,
      form: <Formik
        initialValues={parallelogramInitialValues}
        onSubmit={async ({
          breadth,
          breadth_unit,
          height,
          height_unit
        }, { setSubmitting, resetForm }) => {
          const payload: ParallelogramAreaI = {
            breadth,
            breadth_unit,
            height,
            height_unit,
            method: 'parallelogramArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { success, payload: parallelogramArea } = await calculateMath(payload)
            console.log('=====>', parallelogramArea)
            const {
              area,
              unit,
              submittedbreadth,
              submitted_height,
              unitType,
              areaInbreadthUnit,
              areaInheightUnit,
              breadthInheightUnit,
              $heightInbreadthUnit,

            } = parallelogramArea
            if (typeof parallelogramArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setParallelogramResult({
                area: area,
                breadth: submittedbreadth,
                height: submitted_height,
                unit: unit
              })
            }

            if (typeof parallelogramArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setParallelogramResultTwo({
                areaInbreadthUnit: areaInbreadthUnit,
                areaInheightUnit: areaInheightUnit,
                breadthInheightUnit: breadthInheightUnit,
                $heightInbreadthUnit: $heightInbreadthUnit,
                submitted_height: submitted_height,
                submittedbreadth: submittedbreadth,
                unit: unit
              })
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
              <Label title={LABELS.breadth} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="breadth"
                placeholder={PLACEHOLDERS.number}
                value={values.breadth}
                onChange={handleChange}
              />

              <CustomSelect
                id="breadth_unit"
                measurement="length"
                value={values.breadth_unit}
                onChange={handleChange('breadth_unit')}
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

            <FormRow buttons>
              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </FormRow>
          </form>
        )}
      </Formik>,
      result: <div className="text-wrap text-center">
        <p style={{ fontSize: 14 }}>
          <Latex displayMode={true}>{LATEX.parallelogramArea}</Latex>
        </p>
        {selectedResult === true &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {parallelogramResult.area}{parallelogramResult.unit}<sup>2</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {parallelogramResultTwo.areaInbreadthUnit}{parallelogramResultTwo.unit}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle1">
              = {parallelogramResultTwo.areaInheightUnit}{parallelogramResultTwo.unit}<sup>2</sup>
            </Typography>
          </div>
        }
      </div>
    },
    {
      calcName: "Rectangle Area",
      placeholder: <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />,
      image: <Image path={rectangle} />,
      form: <Formik
        initialValues={rectInitialValues}
        onSubmit={async ({
          length,
          length_unit,
          width,
          width_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: RectangleAreaI = {
            length,
            length_unit,
            width,
            width_unit,
            method: 'rectangleArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { success, payload: rectangleArea } = await calculateMath(payload)
            console.log('=====>', rectangleArea)
            const {
              area,
              units,
              submittedLength,
              submitted_width,
              unitType,
              areaInLengthUnit,
              areaInWidthUnit,
              lengthInWidthUnit,
              $widthInlengthUnit,
            } = rectangleArea
            if (typeof rectangleArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setRectResult({
                area: area,
                submittedLength: submittedLength,
                submitted_width: submitted_width,
                units: units
              })
            }

            if (typeof rectangleArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setRectResultTwo({
                areaInLengthUnit: areaInLengthUnit,
                areaInWidthUnit: areaInWidthUnit,
                lengthInWidthUnit: lengthInWidthUnit,
                $widthInlengthUnit: $widthInlengthUnit,
                submittedLength: submittedLength,
                submitted_width: submitted_width
              })
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
              <Label title={LABELS.length} />
              <CustomTextInput
                type={INPUT_TYPE.text}
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
            </FormRow>


            <FormRow>
              <Label title={LABELS.width} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="width"
                placeholder={PLACEHOLDERS.number}
                value={values.width}
                onChange={handleChange}
              />

              <CustomSelect
                id="width_unit"
                measurement="length"
                value={values.width_unit}
                onChange={handleChange('width_unit')}
              />
            </FormRow>

            <FormRow buttons>
              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </FormRow>
          </form>
        )}
      </Formik>,
      result: <div className="text-wrap text-center">
        <p style={{ fontSize: 14 }}>
          <Latex displayMode={true}>{LATEX.rectangleArea}</Latex>
        </p>
        {selectedResult === true &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {rectResult.area}{rectResult.units}<sup>2</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {rectResultTwo.areaInLengthUnit}{rectResult.units}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle1">
              = {rectResultTwo.areaInWidthUnit}{rectResult.units}<sup>2</sup>
            </Typography>
          </div>
        }
      </div>
    },
    {
      calcName: "Sector Area",
      placeholder: <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />,
      image: <Image path={sector} />,
      form: <Formik
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

            <FormRow buttons>
              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </FormRow>
          </form>
        )}
      </Formik>,
      result: <div className="text-wrap text-center">
        <p style={{ fontSize: 14 }}>
          <Latex displayMode={true}>{LATEX.sectorArea}</Latex>
        </p>
        <Typography variant="subtitle1">
          = {sectorResult.area}{sectorResult.unit}<sup>2</sup>
        </Typography>
      </div>
    },
    {
      calcName: "Trapezoid Area",
      placeholder: <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />,
      image: <Image path={trapezoid} />,
      form: <Formik
        initialValues={trapezoidInitialValues}
        onSubmit={async ({
          base1,
          base1_unit,
          base2,
          base2_unit,
          height,
          height_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: TrapezoidAreaI = {
            base1,
            base1_unit,
            base2,
            base2_unit,
            height,
            height_unit,
            method: 'TrapezoidArea'
          }
          console.log(JSON.stringify(payload))
          //Trapezoid needs aligning with martin
          try {
            const { success, payload: TrapezoidArea } = await calculateMath(payload)
            console.log('=====>', TrapezoidArea)
            const {
              area,
              units,
              unitType,
              submittedbase1,
              submitted_base2,
              submitted_height,
              areaInm,
              base1tom,
              base2tom,
              heighttom,
              areaIncm,
              base1tocm,
              base2tocm,
              heighttocm
            } = TrapezoidArea
            if (typeof TrapezoidArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setTrapezoidResult({
                area: area,
                base1: submittedbase1,
                base2: submitted_base2,
                height: submitted_height,
                unit: units
              })
            }
            if (typeof TrapezoidArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setTrapezoidResultTwo({
                areaIncm: areaIncm,
                base1tocm: base1tocm,
                base2tocm: base2tocm,
                heighttocm: heighttocm,
                areaInm: areaInm,
                base1tom: base1tom,
                base2tom: base2tom,
                heighttom: heighttom

              })
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
              <Label title={LABELS.base1} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="base1"
                placeholder={PLACEHOLDERS.number}
                value={values.base1}
                onChange={handleChange}
              />

              <CustomSelect
                id="base1_unit"
                measurement="length"
                value={values.base1_unit}
                onChange={handleChange('base1_unit')}
              />
            </FormRow>

            <FormRow>
              <Label title={LABELS.base2} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="base2"
                placeholder={PLACEHOLDERS.number}
                value={values.base2}
                onChange={handleChange}
              />

              <CustomSelect
                id="base2_unit"
                measurement="length"
                value={values.base2_unit}
                onChange={handleChange('base2_unit')}
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

            <FormRow buttons>
              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </FormRow>
          </form>
        )}
      </Formik>,
      result: <div className="text-wrap text-center">
        <p style={{ fontSize: 14 }}>
          <Latex displayMode={true}>{LATEX.trapezoidArea}</Latex>
        </p>
        {selectedResult === true &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {trapezoidResult.area}{trapezoidResult.unit}<sup>2</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {trapezoidResultTwo.areaInm}{trapezoidResult.unit}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle1">
              = {trapezoidResultTwo.areaIncm}{trapezoidResult.unit}<sup>2</sup>
            </Typography>
          </div>
        }
      </div>
    },
    {
      calcName: "Triangle Area",
      placeholder: <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />,
      image: <Image path={triangle} />,
      form: <Formik
        initialValues={triangleInitialValues}
        onSubmit={async ({
          sideA,
          sideA_unit,
          sideB,
          sideB_unit,
          sideC,
          sideC_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: TriangleAreaI = {
            sideA,
            sideA_unit,
            sideB,
            sideB_unit,
            sideC,
            sideC_unit,
            method: 'TriangleArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { success, payload: triangleArea } = await calculateMath(payload)
            console.log('=====>', triangleArea)
            const {
              unitType,
              area,
              units,
              sideA,
              sideB,
              sideC,
              areaInLengthUnit,
              areaInWidthUnit
            } = triangleArea
            if (typeof triangleArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setTriangleResult({
                area: area,
                sideA: sideA,
                sideB: sideB,
                sideC: sideC,
                unit: units
              })
            }
            if (typeof triangleArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setTriangleResult2({
                areaInLenghtUnit: areaInLengthUnit,
                areaInWidthUnit: areaInWidthUnit,
                unit: units
              })
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
              <Label title={LABELS.sideA} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="sideA"
                placeholder={PLACEHOLDERS.number}
                value={values.sideA}
                onChange={handleChange}
              />

              <CustomSelect
                id="sideA_unit"
                measurement="length"
                value={values.sideA_unit}
                onChange={handleChange('sideA_unit')}
              />
            </FormRow>

            <FormRow>
              <Label title={LABELS.sideB} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="sideB"
                placeholder={PLACEHOLDERS.number}
                value={values.sideB}
                onChange={handleChange}
              />

              <CustomSelect
                id="sideB_unit"
                measurement="length"
                value={values.sideB_unit}
                onChange={handleChange('sideB_unit')}
              />
            </FormRow>

            <FormRow>
              <Label title={LABELS.sideC} />
              <CustomTextInput
                type={INPUT_TYPE.text}
                id="sideC"
                placeholder={PLACEHOLDERS.number}
                value={values.sideC}
                onChange={handleChange}
              />

              <CustomSelect
                id="sideC_unit"
                measurement="length"
                value={values.sideC_unit}
                onChange={handleChange('sideC_unit')}
              />
            </FormRow>

            <FormRow buttons>
              <CustomResetBtn
                onHandleClick={() => resetForm()}
              />
              <CustomBtn />
            </FormRow>
          </form>
        )}
      </Formik>,
      result: <div className="text-wrap text-center">
        <p style={{ fontSize: 14 }}>
          <Latex displayMode={true}>{LATEX.triangleArea}</Latex>
        </p>
        {selectedResult === true &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {triangleResult.area}{triangleResult.unit}<sup>2</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {triangleResult2.areaInLenghtUnit}{triangleResult.unit}<sup>2</sup>
            </Typography>
            <Typography variant="subtitle1">
              = {triangleResult2.areaInWidthUnit}{triangleResult.unit}<sup>2</sup>
            </Typography>
          </div>
        }
      </div>
    },
  ];

  return (
    <>
      <NavBar2 pagename="Area Calculator" />
      <AddLayout
        categorykey='geometry'
        searchname='Geometry Calculators'
        searchimage={geometry_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          {currentCalc.placeholder}
          <FormTabsContainer
            tabTitle1={currentCalc.calcName}
            dropDown={true}
            opened={open}
            onHandleOpen={handleClickOpen}
            animation={formAnimation}
          >
            {/* DROPDOWN */}
            {open &&
              <Box sx={{
                zIndex: 1,
                position: 'absolute',
                width: 300,
                top: 55,
                left: 10,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                borderRadius: 2.5,
                marginLeft: 2.5,
              }}
                className='text-center'
              >
                <List
                  className='text-center'
                  sx={{
                    color: COLORS.light_text_color,
                  }}
                >
                  {calculators.map((item: any) => (
                    <ListItem
                      onClick={() => handleClose(item.calcName)}
                      key={item.calcName}
                      sx={{
                        paddingBottom: 0.5,
                        paddingTop: 0.5,
                      }}
                    >
                      <ListItemButton
                        sx={{
                          fontSize: 10,
                          background: COLORS.gradient,
                          padding: theme.spacing(0.5),
                          borderRadius: '20px !important',
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      >
                        <Font>
                          <ListItemText
                            primary={item.calcName}

                          />
                        </Font>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            }

            {/* IMAGE */}
            <Box mt={0} mb={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {currentCalc.image}
            </Box>

            {/* FORM */}
            {currentCalc.form}
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer
              tabTitle={"Result"}
              animation={resultAnimation}
            >
              {currentCalc.result}
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default TestCalculator
