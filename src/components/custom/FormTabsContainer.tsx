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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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
    calculators,
    ref,
    config
  } = props;
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
    formDisplay
  }: any = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);

    calculators.map((item: any, index: any) => {
      console.log("INDEX: ", index)
      console.log("TABTITLE: ", item.tabTitle)
    })
  };

  // Animation is add to the containers, pass the values 'ref' and 'config'.
  if (type === "styled") {
    return (
      <Anime
        style={{
          position: 'absolute',
        }}
        ref={ref}
        config={config}
      >
        <Grid item xs={12} sm={sm}>
          <Paper className={paperBackground}>
            <div className={tabRoot}>
              <StyledTabs value={value} onChange={handleChange}>
                {calculators.map((item: any, index: number) => (
                  <StyledTab
                    key={item.tabTitle}
                    label={item.tabTitle}
                    {...a11yProps(index)}
                  />
                ))}
              </StyledTabs>

              {calculators.map((item: any, index: number) => (
                <TabPanel
                  key={item}
                  value={value}
                  index={index}
                >
                  {item.calc}
                </TabPanel>
              ))}
            </div>
          </Paper>
        </Grid>
      </Anime>
    )
  } else if (dropDown === true) {
    return (
      <Anime
        style={{
          position: 'absolute',
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
        </Box>
      </Anime>
    )
  } else {
    return (
      <Anime
        style={{
          position: 'absolute',
        }}
        ref={ref}
        config={config}
      >
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
      </Anime>
    )
  }
}

export default FormTabsContainer
