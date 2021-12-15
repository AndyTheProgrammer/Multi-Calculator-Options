import React, { useState } from 'react';
import { NavBar2 } from '../navbar/navbar2'
import { Box, Typography } from '@mui/material'
import { MathOptions } from '../calculator/mathOptions'
import { mathRoutes } from '../../routes/routes'
import { Slide } from '../slider/slider'
import AddLayout from '../layouts/AddLayout';
import { SearchForm } from '../forms/searchForm'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import math_icon from '../../common/assets/math_icon.svg';


function MathCategories(){
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(true);
  
    return(
        <div>
          <Switch>
          <Route exact path={path}>
            <NavBar2 pageimage={math_icon} pagename="Math Calculators" mathHighLight={true}/>
            <Box
              sx={{
              display: 'flex',
              justifyContent: 'center',
              }}>
                {
                  showSearch ? <SearchForm />: null
                }
            </Box>
            <MathOptions />
            <Box sx={{ marginTop: 5 }}>
              <Slide />
            </Box>
          </Route>
          {
            mathRoutes.subCategories[0].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                    <r.component />
                </Route>
              );
            })
          }
          {
            mathRoutes.subCategories[1].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[2].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[3].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[4].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[5].sub_calculator.map((r:any) => {
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

export { MathCategories }