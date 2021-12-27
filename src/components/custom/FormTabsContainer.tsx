import React from 'react'
import { useSpring, animated } from 'react-spring'

import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';
import TabPanel from './TabPanel';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import { Grid, Paper, Box } from '@mui/material';
import useStyles from '../../styling/CustomStyles'

interface FormProps {
  children?: React.ReactNode;
  tabTitle1?: String;
  tabTitle2?: String;
  dropDown?: Boolean;
  openDrop?: String;
  animation?: {};
}

function FormTabsContainer(props: FormProps) {
  const {
    children,
    tabTitle1,
    tabTitle2,
    dropDown,
    openDrop,
    animation,
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
      <animated.div
        style={animation}
      >
        <Paper className={formDisplay}>
          <div className={tabRoot}>
            <StyledTabs>
              <StaticTab
                className={leftTabContainer}
                label={tabTitle1}
                dropDown={true}
                openDrop={openDrop}
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
      </animated.div>
    )
  } else {
    return (
      <animated.div
        style={animation}
      >
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
      </animated.div>
    )
  }
}

export default FormTabsContainer
