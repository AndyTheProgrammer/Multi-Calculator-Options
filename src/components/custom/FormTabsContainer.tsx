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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function FormTabsContainer(props: any) {
  const { children, tabTitle1, tabTitle2, sm } = props;
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
  } = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid item xs={12} sm={sm}>
      <Paper className={paperBackground}>
        <div className={tabRoot}>
          <StyledTabs value={value} onChange={handleChange} >
            <StyledTab
              label={tabTitle1}
              {...a11yProps(0)}
            />
            <StyledTab
              label={tabTitle2}
            />
          </StyledTabs>

          <TabPanel value={value} index={0}>
            {children}
          </TabPanel>
        </div>
      </Paper>
    </Grid>
  )
}

export default FormTabsContainer
