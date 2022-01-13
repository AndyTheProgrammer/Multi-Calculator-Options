import React from 'react'
import { Grid, } from '@mui/material';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import {
  useAppSelector,
  selectCalculators,
} from "../../../../../redux";
import {
  DueDateMittendorfWilliam,
  DueDateNaegeleRule,
  DueDateParikhsRule,
  DueDateWoodsRule,
} from '../../../index'
import {
  other_icon,
  health_calc_icon,
} from "../../../../../common/assets"

function DueDateCalculator() {
  const { selectedCalculator } = useAppSelector(selectCalculators);

  const calculators = [
    {
      calcName: "Mittendorf William Rule",
      component: <DueDateMittendorfWilliam />,
    },
    {
      calcName: "Naegele Rule",
      component: <DueDateNaegeleRule />,
    },
    {
      calcName: "Parikh's Rule",
      component: <DueDateParikhsRule />,
    },
    {
      calcName: "Woods Rule",
      component: <DueDateWoodsRule />,
    }
  ];

  const getCurrentCalc = calculators.find(({ calcName }) => calcName === selectedCalculator);

  return (
    <>
      <NavBar2
        pageimage={other_icon}
        categoryname="Health Calculators"
        pagename="Due Date Calculator"
      />
      <AddLayout
        categorykey='health'
        searchname='Health Calculators'
        searchimage={health_calc_icon}
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

export default DueDateCalculator
