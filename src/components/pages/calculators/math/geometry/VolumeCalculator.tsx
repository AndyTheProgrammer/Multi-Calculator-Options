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
  CapsuleVolume,
  ConeVolume,
  ConicalFrustumVolume,
  CubeVolume,
  CylinderVolume,
  EllipsoidVolume,
  RectangularTankVolume,
  SphereVolume,
  SphericalCapVolume,
  SquarePyramidVolume,
  TubeVolume,
} from '../../../index'

function VolumeCalculator() {
  const { selectedCalculator } = useAppSelector(selectCalculators);

  const calculators = [
    {
      calcName: "Capsule Volume",
      component: <CapsuleVolume />,
    },
    {
      calcName: "Cone Volume",
      component: <ConeVolume />,
    },
    {
      calcName: "Conical Frustrum Volume",
      component: <ConicalFrustumVolume />,
    },
    {
      calcName: "Cube Volume",
      component: <CubeVolume />,
    },
    {
      calcName: "Cylinder Volume",
      component: <CylinderVolume />,
    },
    {
      calcName: "Ellipsoid Volume",
      component: <EllipsoidVolume />,
    },
    {
      calcName: "Rectangular Tank Volume",
      component: <RectangularTankVolume />,
    },
    {
      calcName: "Sphere Volume",
      component: <SphereVolume />,
    },
    {
      calcName: "Spherical Cap Volume",
      component: <SphericalCapVolume />,
    },
    {
      calcName: "Square Pyramid Volume",
      component: <SquarePyramidVolume />,
    },
    {
      calcName: "Tube Volume",
      component: <TubeVolume />,
    },
  ];

  const getCurrentCalc = calculators.find(({ calcName }) => calcName === selectedCalculator);
  return (
    <>
      <NavBar2
        pagename="Volume Calculator"
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
        </Grid>
      </AddLayout>
    </>
  )
}

export default VolumeCalculator
