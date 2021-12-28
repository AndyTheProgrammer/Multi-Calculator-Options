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
            <NavBar2 pageimage={other_icon} pagecategoryname="Other Calculators" categoryname="Other Calculators" otherHighLight={true}/>
            
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

            <OtherOptions />
          </Route>
          
        </Switch>
        
      </div>
    );
}

export { OtherPage }