import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';
import TabPanel from './TabPanel';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import { Grid, Paper, Box } from '@mui/material';
import useStyles from '../../styling/CustomStyles'
import DropDown from './DropDown';

interface FormProps {
  children?: React.ReactNode;
  tabTitle1?: String;
  tabTitle2?: String;
  dropDown?: Boolean;
  openDrop?: String;
  opened?: boolean;
  onHandleOpen?: (value: any) => any;
  animation?: {};
  // showDropDown: boolean
  calculatorList?: string[]
  func?: any
}


function FormTabsContainer(props: FormProps) {
  const {
    children,
    tabTitle1,
    tabTitle2,
    dropDown,
    openDrop,
    opened,
    onHandleOpen,
    animation,
    // showDropDown
    calculatorList,
    func
  } = props;
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
    formDisplay
  }: any = useStyles()

  const [selected, setSelected ] = useState<string>()

  const pullData = (data: string) => { 
       setSelected(data)
  }
  // func(selected)
  console.log('I was picked', selected )

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
                opened={opened}
                openDrop={openDrop || onHandleOpen}
              />
              <StaticTab
                className={rightTabContainer}
                label={tabTitle2}
              />
            </StyledTabs>
            {opened ? <DropDown calculators={calculatorList} func={pullData} /> : null }
            

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
