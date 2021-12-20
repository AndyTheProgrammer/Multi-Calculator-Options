import React from 'react'
import { Box, Grid } from '@material-ui/core'

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
  BallSurfaceArea,
  CapsuleSurfaceArea,
  ConeSurfArea,
  ConicalFrustrumSurfaceArea,
  CubeSurfArea,
  CylindricalTankSurfArea,
  EllipsoidSurfaceArea,
  SphericalCapSurfaceArea,
  SquarePyramidSurfaceArea,
} from '../index'

function SurfaceAreaCalculator() {
  const [open, setOpen] = React.useState(false);
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("Ball Surface Area");

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
    calcName: "Ball Surface Area",
    component: <BallSurfaceArea openDrop={handleClickOpen} />,
  });

  const calculators = [
    {
      calcName: "Ball Surface Area",
      component: <BallSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Capsule Surface Area",
      component: <CapsuleSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Cone Surface Area",
      component: <ConeSurfArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Conical Frustrum Surface Area",
      component: <ConicalFrustrumSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Cube Surface Area",
      component: <CubeSurfArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Cylindrical Tank Surface Area",
      component: <CylindricalTankSurfArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Ellipsoid Surface Area",
      component: <EllipsoidSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Spherical Cap Surface Area",
      component: <SphericalCapSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Square Pyramid Surface Area",
      component: <SquarePyramidSurfaceArea openDrop={handleClickOpen} />,
    },
  ];

  return (
    <>
      <NavBar2 pagename="Surface Area Calculator" />
      <AddLayout>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {currentCalc.component}
          <SimpleDialog
            dropOptions={calculators}
            selectedValue={selectedCalc}
            open={open}
            onClose={handleClose}
          />
        </Box>
      </AddLayout>
    </>
  )
}

export default SurfaceAreaCalculator
