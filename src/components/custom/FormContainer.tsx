import React, { FC } from 'react'
import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';
import TabPanel from './TabPanel';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import { Grid, Paper } from '@material-ui/core';
import useStyles from '../../styling/CustomStyles'
import { Font, FontProvider } from '../font'

interface FormProps {
  children?: React.ReactNode;
  tabTitle: string;
}


function FormTabsContainer(props: any) {
  const { children, tabTitle1, tabTitle2, sm } = props;
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
  } = useStyles()
  return (
    <Grid item xs={12} sm={sm}>
      <Paper className={paperBackground}>
        <div className={tabRoot}>
          <StyledTabs>
            <StaticTab
              className={leftTabContainer}
              label={tabTitle1}
            />
            <StaticTab
              className={rightTabContainer}
              label={tabTitle2}
            />
          </StyledTabs>

          <NoIndexTabPanel>
            {children}
          </NoIndexTabPanel>
        </div>
      </Paper>
    </Grid>
  )
}

export default FormTabsContainer
