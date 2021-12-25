import React from 'react'

import { NavBar2 } from '../../navbar/navbar2'
import AddLayout from '../../layouts/AddLayout'
import { SimpleDialog } from "../../content";
import {
  DueDateMittendorfWilliam,
  DueDateNaegeleRule,
  DueDateParikhsRule,
  DueDateWoodsRule,
} from '../index'

function DueDateCalculator() {
  const [open, setOpen] = React.useState(false);
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("Mittendorf William Rule");

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
    calcName: "Mittendorf William Rule",
    component: <DueDateMittendorfWilliam openDrop={handleClickOpen} />,
  });

  const calculators = [
    {
      calcName: "Mittendorf William Rule",
      component: <DueDateMittendorfWilliam openDrop={handleClickOpen} />,
    },
    {
      calcName: "Naegele Rule",
      component: <DueDateNaegeleRule openDrop={handleClickOpen} />,
    },
    {
      calcName: "Parikh's Rule",
      component: <DueDateParikhsRule openDrop={handleClickOpen} />,
    },
    {
      calcName: "Woods Rule",
      component: <DueDateWoodsRule openDrop={handleClickOpen} />,
    }
  ];
  return (
    <>
      <NavBar2 pagename="Due Date Calculator" />
      <AddLayout>
        {currentCalc.component}
        <SimpleDialog
          dropOptions={calculators}
          selectedValue={selectedCalc}
          open={open}
          onClose={handleClose}
        />
      </AddLayout>
    </>
  )
}

export default DueDateCalculator
