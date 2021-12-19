import React from 'react'
import Anime from 'react-animejs-wrapper'

import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';
import TabPanel from './TabPanel';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import { Grid, Paper, Box } from '@mui/material';
import useStyles from '../../styling/CustomStyles'
import { Font, FontProvider } from '../font'

const Latex = require('react-latex');

interface ResultsProps {
  children?: React.ReactNode;
  tabTitle: string;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ResultTabsContainer = (props: any) => {
  const { children, tabTitle1, tabTitle2, sm, type, ref, config, latex } = props;
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
    formDisplay
  } = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (type === "styled") {
    return (
      <Anime
        style={{
          position: 'absolute',
          zIndex: -5
        }}
        ref={ref}
        config={config}
      >
        <Box>
          <Paper className={paperBackground}>
            <div className={tabRoot} style={{ maxHeight: '30' }}>
              <StyledTabs value={value} onChange={handleChange} >
                <StyledTab
                  label={tabTitle1}
                  {...a11yProps(0)}
                />
                <StyledTab
                  label={tabTitle2}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel value={value} index={0}>
                <Latex displayMode={false}>{latex}</Latex>
                {children}
              </TabPanel>
            </div>
          </Paper>
        </Box>
      </Anime>
    )
  } else {
    return (
      <Anime
        style={{
          position: 'absolute',
          zIndex: -5
        }}
        ref={ref}
        config={config}
      >
        <Box>
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
                <Latex displayMode={false}>{latex}</Latex>
                {children}
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Box>
      </Anime>
    )
  }
}

export default ResultTabsContainer
