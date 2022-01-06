import React from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { SimpleDialog } from "../../../../content";
import useStyles from "../../../../../styling/CustomStyles";
import {
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../../common/shared'
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
  const { sideBarPaperBackground } = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("Circular Slab or Tube");

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
    calcName: "Circular Slab or Tube",
    component: <CircularSlab openDrop={handleClickOpen} />,
  });

  const calculators = [
    {
      calcName: "Circular Slab or Tube",
      component: <CircularSlab openDrop={handleClickOpen} />,
    },
    {
      calcName: "Slabs, Square Footings, or Walls",
      component: <ConcreteSquareFooting openDrop={handleClickOpen} />,
    },
    {
      calcName: "Hole, Column, or Round Footings",
      component: <HoleColumn openDrop={handleClickOpen} />,
    },
    {
      calcName: "Curb and Gutter Barrier",
      component: <CurbAndGutterBarrier openDrop={handleClickOpen} />,
    },
    {
      calcName: "Sample Size",
      component: <StairsConcreate openDrop={handleClickOpen} />,
    },
  ];
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
          {/* Form */}
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

export default ConcreteCalculator
