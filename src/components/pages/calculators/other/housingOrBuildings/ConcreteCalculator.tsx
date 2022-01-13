import React from 'react'
import Grid from "@material-ui/core/Grid";

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import {
  useAppSelector,
  selectCalculators,
} from "../../../../../redux";
import {
  CircularSlab,
  ConcreteSquareFooting,
  CurbAndGutterBarrier,
  HoleColumn,
  StairsConcreate
} from "../../../index";
import {
  other_icon,
  health_calc_icon,
} from "../../../../../common/assets"

function ConcreteCalculator() {
  const { selectedCalculator } = useAppSelector(selectCalculators);

  const calculators = [
    {
      calcName: "Circular Slab or Tube",
      component: <CircularSlab />,
    },
    {
      calcName: "Slabs, Square Footings, or Walls",
      component: <ConcreteSquareFooting />,
    },
    {
      calcName: "Hole, Column, or Round Footings",
      component: <HoleColumn />,
    },
    {
      calcName: "Curb and Gutter Barrier",
      component: <CurbAndGutterBarrier />,
    },
    {
      calcName: "Stairs",
      component: <StairsConcreate />,
    },
  ];

  const getCurrentCalc = calculators.find(({ calcName }) => calcName === selectedCalculator);

  return (
    <>
      <NavBar2
        pageimage={other_icon}
        categoryname="Housing/Building Calculators"
        pagename="Concrete Calculator"
      />
      <AddLayout
        categorykey='housing'
        searchname='Housing/Building Calculators'
      // searchimage={health_calc_icon}
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
        </Grid>
      </AddLayout>
    </>
  )
}

export default ConcreteCalculator
