import React from 'react';
import { NavBar2 } from '../navbar/navbar2'
import { Box, Typography } from '@mui/material'
import { Slide } from '../slider/slider'
import { FinanceOptions } from '../calculator/financeOptions'
import { SearchForm } from '../forms/searchForm'
import { financialRoutes } from '../../routes/routes'
import AddLayout from '../layouts/AddLayout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";

import fincance_icon from '../../common/assets/finance_icon.svg';


function FinancePage(){
  let { path, url } = useRouteMatch();

    return(
        <div>
          

          <Switch>
          <Route exact path={path}>
            <NavBar2 pageimage={fincance_icon} pagename="Financial Calculators" financialHighLight={true} />
            {/* Hide search bar when screen is small */}
            <Box
              sx={{
                display: {
                  lg: 'flex',
                  md: 'flex',
                  sm: 'none',
                  xs: 'none'
                },
                justifyContent: 'center',
              }}>
                <SearchForm />
            </Box>

            
            <FinanceOptions />
            <Box sx={{ marginTop: 5 }}>
              <Slide />
            </Box>
          </Route>
          {
            financialRoutes.subCategories[0].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
          {
            financialRoutes.subCategories[1].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
        </Switch>
      </div>
    );
}

export { FinancePage }