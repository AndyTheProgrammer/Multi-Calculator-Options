import React from 'react'
import { Grid } from '@material-ui/core'

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { geometry_icon, math_icon } from '../../../../../common/assets';
import {
  useAppSelector,
  selectCalculators,
} from "../../../../../redux";
import {
  BallSurfaceArea,
  CapsuleSurfaceArea,
  ConeSurfArea,
  ConicalFrustrumSurfaceArea,
  CubeSurfArea,
  CylindricalTankSurfArea,
  EllipsoidSurfaceArea,
  SphericalCapSurfaceArea,
  SquarePyramidSurfaceArea,
} from '../../../index'
import { CALCULATORS } from '../../../../../common/shared';

function SurfaceAreaCalculator() {
  const { selectedCalculator } = useAppSelector(selectCalculators);

  const calculators = [
    {
      calcName: CALCULATORS.ballSurfArea,
      component: <BallSurfaceArea />,
    },
    {
      calcName: CALCULATORS.capsuleSurfArea,
      component: <CapsuleSurfaceArea />,
    },
    {
      calcName: CALCULATORS.coneSurfArea,
      component: <ConeSurfArea />,
    },
    {
      calcName: CALCULATORS.conicalFrustrumSurfArea,
      component: <ConicalFrustrumSurfaceArea />,
    },
    {
      calcName: CALCULATORS.cubeSurfArea,
      component: <CubeSurfArea />,
    },
    {
      calcName: CALCULATORS.cylindricalTankSurfArea,
      component: <CylindricalTankSurfArea />,
    },
    {
      calcName: CALCULATORS.ellipsoidSurfArea,
      component: <EllipsoidSurfaceArea />,
    },
    {
      calcName: CALCULATORS.sphericalCapSurfArea,
      component: <SphericalCapSurfaceArea />,
    },
    {
      calcName: CALCULATORS.squarePyramidSurfArea,
      component: <SquarePyramidSurfaceArea />,
    },
  ];

  const getCurrentCalc = calculators.find(({ calcName }) => calcName === selectedCalculator);

  return (
    <>
      <NavBar2
        pageimage={math_icon}
        categoryname="Geometry Calculators"
        pagename="Surface Area Calculator"
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
        </Grid>
      </AddLayout>
    </>
  )
}

export default SurfaceAreaCalculator
