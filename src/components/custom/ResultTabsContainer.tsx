import React, { FC } from 'react'
import Anime from 'react-animejs-wrapper'
import { Grid, Paper, Box, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring'

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
  tabTitle: string;
}

const ResultTabsContainer = (props: any) => {
  const { children, tabTitle, latex } = props;
  const {
    tabRoot,
    rightTabContainer,
    formCardStyle,
    paperBackground,
    formResult,
    formDisplay
  } = useStyles()

  return (
    <div className={formDisplay}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ height: 40, width: '100%' }}>
          <Box
            sx={{
              color: '#4072B5',
              fontWeight: 'bold',
              textAlign: 'center',
            }}><FontProvider fonts={[{ font: 'Varela Round' }]}>
              <Typography>
                <Font>{tabTitle}</Font>
              </Typography>
            </FontProvider>
          </Box>
        </Box>
        <Box className={rightTabContainer}></Box>
      </Box>

      <div>
        <div className='overflow-auto p-3'>
          <Latex displayMode={true}>{latex}</Latex>
          {children}
        </div>
      </div>
    </div>
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