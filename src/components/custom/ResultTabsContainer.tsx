import React, { FC } from 'react'
import Anime from 'react-animejs-wrapper'
import { Grid, Paper, Box, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';
import TabPanel from './TabPanel';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import useStyles from '../../styling/CustomStyles'
import { Font, FontProvider } from '../font'

const Latex = require('react-latex');

interface ResultsProps {
  children?: React.ReactNode;
  tabTitle: String;
  latex?: String;
  animation?: {};
}

const ResultTabsContainer = (props: ResultsProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { children, tabTitle, latex, animation } = props;
  const {
    tabRoot,
    leftTabContainer,
    rightTabContainer,
    formCardStyle,
    paperBackground,
    formResult,
    formDisplay
  } = useStyles()

  return (
    <animated.div style={animation}>
      <div
        className={formResult}
        style={{ minWidth: matches ? 250 : 350 }} // width
      >
        <div className={tabRoot}>
          <StyledTabs>
            <StaticTab
              className={leftTabContainer}
              label={tabTitle}
            />
            <StaticTab
              className={rightTabContainer}
            />
          </StyledTabs>

          <NoIndexTabPanel>
            <p style={{ fontSize: 14 }}>
              <Latex displayMode={true}>{latex}</Latex>
            </p>
            {children}
          </NoIndexTabPanel>
        </div>
      </div>
    </animated.div>
  )
}

export default ResultTabsContainer

/* const ResultTabsContainer = React.forwardRef((props: any, ref) => {
  const { children, tabTitle1, tabTitle2, sm, config, latex } = props;
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
    resultContainer
  } = useStyles()

  return (
    <Anime
      style={{
        position: 'absolute',
        zIndex: -5
      }}
      ref={ref}
      config={{ config }}
    >
      <Box className={resultContainer}>
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
            <Latex displayMode={false}>{latex}</Latex>
            {children}
          </NoIndexTabPanel>
        </div>
      </Box>
    </Anime>
  )
}) */