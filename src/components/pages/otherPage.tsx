import React from 'react';
import { NavBar2 } from '../navbar/navbar2'
import { Box, Typography } from '@mui/material'
import { OtherOptions } from '../calculator/otherOptions'
import { Slide } from '../slider/slider'
import { othersRoutes } from '../../routes/routes'
import { SearchForm } from '../forms/searchForm'
import AddLayout from '../layouts/AddLayout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
  useRouteMatch
} from "react-router-dom";

import other_icon from '../../common/assets/other_icon.svg';


function OtherPage(){
  let { path, url } = useRouteMatch();
  const history = useHistory();

    return(
        <div>
         
          <Switch>  
          <Route exact path={path}>
            <NavBar2 pageimage={other_icon} pagename="Other Calculators" otherHighLight={true}/>
            <Box
              sx={{
              display: 'flex',
              justifyContent: 'center',
              }}>
                <SearchForm />
            </Box>
            <OtherOptions />
            <Box sx={{ marginTop: 5 }}>
              <Slide />
            </Box>
          </Route>
          {othersRoutes.subCategories[5].sub_calculator.map((route, i) => (
                <Route key={route.name} path={route.path} >{
                      <route.component />
                }</Route>
            ))}
        </Switch>
        
      </div>
    );
}

export { OtherPage }