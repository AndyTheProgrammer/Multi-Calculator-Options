import React from 'react'
import Anime from 'react-animejs-wrapper'

import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';
import TabPanel from './TabPanel';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import { Grid, Paper, Box } from '@mui/material';
import useStyles from '../../styling/CustomStyles'

interface FormProps {
  children?: React.ReactNode;
  tabTitle: string;
}

function FormTabsContainer(props: any) {
  const {
    children,
    tabTitle1,
    tabTitle2,
    sm,
    type,
    dropDown,
    openDrop,
  } = props;
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
    formDisplay
  }: any = useStyles()

  if (dropDown === true) {
    return (
      <Paper className={formDisplay}>
        <div className={tabRoot}>
          <StyledTabs>
            <StaticTab
              className={leftTabContainer}
              label={tabTitle1}
            />
            <StaticTab
              className={rightTabContainer}
              label={tabTitle2}
              dropDown={true}
              openDrop={openDrop}
            />
          </StyledTabs>

          <NoIndexTabPanel>
            {children}
          </NoIndexTabPanel>
        </div>
      </Paper>
    )
  } else {
    return (
      <Paper className={formDisplay}>
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
    )
  }
}

export default FormTabsContainer
