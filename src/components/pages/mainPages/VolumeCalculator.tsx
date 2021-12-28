import React from 'react'
import { Grid, Box } from '@mui/material';

import { NavBar2 } from '../../navbar/navbar2'
import AddLayout from '../../layouts/AddLayout'
import { SimpleDialog } from "../../content";
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../common/shared'
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
} from '../index'

function VolumeCalculator() {
  const [open, setOpen] = React.useState(false);
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("Capsule Volume");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
    if (value) {
      setSelectedCalc(value);

      // find calcName that matches the selected calc
      const getCalc = calculators.find(({ calcName }) => calcName === value);
      setCurrentCalc(getCalc!);
    }
  };

  // main state
  const [currentCalc, setCurrentCalc] = React.useState({
    calcName: "Capsule Volume",
    component: <CapsuleVolume openDrop={handleClickOpen} />,
  });

  const calculators = [
    {
      calcName: "Capsule Volume",
      component: <CapsuleVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Cone Volume",
      component: <ConeVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Conical Frustrum Volume",
      component: <ConicalFrustumVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Ellipsoid Volume",
      component: <EllipsoidVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Rectangular Tank Volume",
      component: <RectangularTankVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Sphere Volume",
      component: <SphereVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Spherical Cap Volume",
      component: <SphericalCapVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Square Pyramid Volume",
      component: <SquarePyramidVolume openDrop={handleClickOpen} />,
    },
    {
      calcName: "Tube Volume",
      component: <TubeVolume openDrop={handleClickOpen} />,
    },
  ];

  return (
    <>
      <NavBar2 pagename="Volume Calculator" />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          {currentCalc.component}
          <SimpleDialog
            dropOptions={calculators}
            selectedValue={selectedCalc}
            open={open}
            onClose={handleClose}
          />
        </Grid>
      </AddLayout>
    </>
  )
}

export default VolumeCalculator
