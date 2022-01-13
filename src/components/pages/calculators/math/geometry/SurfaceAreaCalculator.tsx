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

function SurfaceAreaCalculator() {
  const { selectedCalculator } = useAppSelector(selectCalculators);

  const calculators = [
    {
      calcName: "Ball Surface Area",
      component: <BallSurfaceArea />,
    },
    {
      calcName: "Capsule Surface Area",
      component: <CapsuleSurfaceArea />,
    },
    {
      calcName: "Cone Surface Area",
      component: <ConeSurfArea />,
    },
    {
      calcName: "Conical Frustrum Surface Area",
      component: <ConicalFrustrumSurfaceArea />,
    },
    {
      calcName: "Cube Surface Area",
      component: <CubeSurfArea />,
    },
    {
      calcName: "Cylindrical Tank Surface Area",
      component: <CylindricalTankSurfArea />,
    },
    {
      calcName: "Ellipsoid Surface Area",
      component: <EllipsoidSurfaceArea />,
    },
    {
      calcName: "Spherical Cap Surface Area",
      component: <SphericalCapSurfaceArea />,
    },
    {
      calcName: "Square Pyramid Surface Area",
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
