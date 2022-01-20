import React from 'react'
import { Grid, Paper, Box, Typography } from '@mui/material';
import { animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import TabsContainer from './TabsContainer';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import useStyles, { labelStyle, formCardStyle } from '../../styling/CustomStyles'
import { Font, FontProvider } from '../font'
import { SIZES } from '../../common/shared';

const Latex = require('react-latex');

interface ResultsProps {
  children?: React.ReactNode;
  tabTitle: String;
  latex?: String;
  animation?: {};
  steps?: boolean;
}

const ResultTabsContainer = (props: ResultsProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { children, tabTitle, latex, animation, steps } = props;
  const {
    tabRoot,
    formResult,
    resultContainer,
  } = useStyles()

  return (
    <animated.div style={animation}>
      <div
        className={formResult}
        style={{ minWidth: matches ? 250 : 350 }} // width
      >
        <div className={tabRoot}>
          <TabsContainer>
            <StaticTab
              label={tabTitle}
            />
          </TabsContainer>

          <NoIndexTabPanel>
            <Box className={resultContainer}>
              <Typography >
                <Box
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: 2,
                    fontSize: SIZES.defaultFont,
                  }}
                >
                  Calculation Steps:
                </Box>
              </Typography>

              <p style={{ fontSize: SIZES.secondFont }}>
                <Latex displayMode={true}>{latex}</Latex>
              </p>

              {children}
            </Box>

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