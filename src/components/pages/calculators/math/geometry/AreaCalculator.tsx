import React from 'react'
import { Grid } from '@mui/material';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { geometry_icon, math_icon } from '../../../../../common/assets';
import {
  useAppSelector,
  selectCalculators,
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

  const calculators = [
    {
      calcName: "Circle Area",
      component: <CircleArea />,
    },
    {
      calcName: "Ellipse Area",
      component: <EllipseArea />,
    },
    {
      calcName: "Parallelogram Area",
      component: <ParallelogramArea />,
    },
    {
      calcName: "Rectangle Area",
      component: <RectangularArea />,
    },
    {
      calcName: "Sector Area",
      component: <SectorArea />,
    },
    {
      calcName: "Trapezoid Area",
      component: <TrapezoidArea />,
    },
    {
      calcName: "Triangle Area",
      component: <TriangleArea />,
    },
  ];

  const getCurrentCalc = calculators.find(({ calcName }) => calcName === selectedCalculator);

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
          {typeof getCurrentCalc === "undefined"
            ?
            calculators[0].component
            :
            getCurrentCalc!.component
          }
          {/* {calculators.map(e => {
            if (e.calcName === selectedCalculator && selectedCalculator !== "") {
              return e.component
            } else {
              return calculators[0].component
            }
          })} */}
        </Grid>
      </AddLayout>
    </>
  )
}

export default AreaCalculator
