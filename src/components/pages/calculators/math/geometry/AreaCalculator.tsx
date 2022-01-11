import React from 'react'
import { Grid, Box } from '@mui/material';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { SimpleDialog } from "../../../../content";
import { geometry_icon, math_icon } from '../../../../../common/assets';
import {
  useAppSelector,
  useAppDispatch,
  selectCalculators,
  setSelectedCalculator,
} from "../../../../../redux";
import {
  CircleArea,
  EllipseArea,
  ParallelogramArea,
  RectangularArea,
  SectorArea,
  TrapezoidArea,
  TriangleArea,
} from '../../../index'

function AreaCalculator() {
  const { selectedCalculator } = useAppSelector(selectCalculators);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("Circle Area");

  const handleClickOpen = () => {
    setOpen(true);
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

  // main state
  const [currentCalc, setCurrentCalc] = React.useState({
    calcName: "Circle Area",
    component: <CircleArea openDrop={handleClickOpen} />,
  });

  const calculators = [
    {
      calcName: "Circle Area",
      component: <CircleArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Ellipse Area",
      component: <EllipseArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Parallelogram Area",
      component: <ParallelogramArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Rectangle Area",
      component: <RectangularArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Sector Area",
      component: <SectorArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Trapezoid Area",
      component: <TrapezoidArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Triangle Area",
      component: <TriangleArea openDrop={handleClickOpen} />,
    },
  ];
  return (
    <>
      <NavBar2
        pagename="Area Calculator"
        pageimage={math_icon}
        categoryname="Geometry Calculators"
      />
      <AddLayout
        categorykey='geometry'
        searchname='Geometry Calculators'
        searchimage={geometry_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          {calculators.map(e => {
            if (e.calcName === selectedCalculator) {
              return e.component
            }
          })}



          {/*  <SimpleDialog
            dropOptions={calculators}
            selectedValue={selectedCalc}
            open={open}
            onClose={handleClose}
          /> */}
        </Grid>
      </AddLayout>
    </>
  )
}

export default AreaCalculator
