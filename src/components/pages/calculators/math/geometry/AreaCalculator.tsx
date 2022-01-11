import React from 'react'
import { Grid, Box } from '@mui/material';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { SimpleDialog } from "../../../../content";
import { geometry_icon, math_icon } from '../../../../../common/assets';
import { useAppSelector, useAppDispatch, setselectedCalculator, selectCalculators } from "../../../../../redux";
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
    setOpen(!open);
    console.log("OPENED: ", open)
  };

  const handleClose = (value: any) => {
    setOpen(false)
    if (value) {
      setSelectedCalc(value)
      console.log("CALC: ", value)

      // find calcName that matches the selected calc
      const getCalc = calculators.find(({ calcName }) => calcName === value)
      setCurrentCalc(getCalc!)
    }
  };

  const calcs = [
    "Circle Area",
    "Ellipse Area",
    "Parallelogram Area",
    "Rectangle Area",
    "Sector Area",
    "Trapezoid Area",
    "Triangle Area",
  ];


  // main state
  const [currentCalc, setCurrentCalc] = React.useState({
    calcName: "Circle Area",
    component: <CircleArea calcs={calcs} onHandleOpen={handleClickOpen} opened={open} onHandleClose={handleClose} />,
  });

  const calculators = [
    {
      calcName: "Circle Area",
      component: <CircleArea calcs={calcs} onHandleOpen={handleClickOpen} />,
    },
    {
      calcName: "Ellipse Area",
      component: <EllipseArea calcs={calcs} onHandleOpen={handleClickOpen} />,
    },
    {
      calcName: "Parallelogram Area",
      component: <ParallelogramArea calcs={calcs} onHandleOpen={handleClickOpen} />,
    },
    {
      calcName: "Rectangle Area",
      component: <RectangularArea calcs={calcs} onHandleOpen={handleClickOpen} />,
    },
    {
      calcName: "Sector Area",
      component: <SectorArea calcs={calcs} onHandleOpen={handleClickOpen} />,
    },
    {
      calcName: "Trapezoid Area",
      component: <TrapezoidArea calcs={calcs} onHandleOpen={handleClickOpen} />,
    },
    {
      calcName: "Triangle Area",
      component: <TriangleArea calcs={calcs} onHandleOpen={handleClickOpen} />,
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
          {calculators.find(e => {
            if (e.calcName === selectedCalculator) {
              return e.component
            }
            return <CircleArea />
          })}


          {/* <SimpleDialog
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
