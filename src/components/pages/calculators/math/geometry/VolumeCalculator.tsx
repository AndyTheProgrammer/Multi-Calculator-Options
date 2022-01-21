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
import { CALCULATORS } from '../../../../../common/shared';

function VolumeCalculator() {
  const { selectedCalculator } = useAppSelector(selectCalculators);

  const calculators = [
    {
      calcName: CALCULATORS.capsuleVol,
      component: <CapsuleVolume />,
    },
    {
      calcName: CALCULATORS.coneVol,
      component: <ConeVolume />,
    },
    {
      calcName: CALCULATORS.conicalFrustrumVol,
      component: <ConicalFrustumVolume />,
    },
    {
      calcName: CALCULATORS.cubeVol,
      component: <CubeVolume />,
    },
    {
      calcName: CALCULATORS.cylinderVol,
      component: <CylinderVolume />,
    },
    {
      calcName: CALCULATORS.ellipsoidVol,
      component: <EllipsoidVolume />,
    },
    {
      calcName: CALCULATORS.rectangularTankVol,
      component: <RectangularTankVolume />,
    },
    {
      calcName: CALCULATORS.sphereVol,
      component: <SphereVolume />,
    },
    {
      calcName: CALCULATORS.sphericalCapVol,
      component: <SphericalCapVolume />,
    },
    {
      calcName: CALCULATORS.squarePyramidVol,
      component: <SquarePyramidVolume />,
    },
    {
      calcName: CALCULATORS.tubeVol,
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
