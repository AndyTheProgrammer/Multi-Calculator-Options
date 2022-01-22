import React, { useState } from 'react'
import { animated } from 'react-spring'
import { Paper, Box, Typography } from '@mui/material';

import StyledTabs from './StyledTabs';
import NoIndexTabPanel from './NoIndexTabPanel';
import StaticTab from './StaticTab';
import useStyles, { labelStyle, formCardStyle } from '../../styling/CustomStyles'
import DropDown from './DropDown';
import TabsContainer from './TabsContainer';

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
    formDisplay
  }: any = useStyles()

  const [selected, setSelected] = useState<string>()

  const pullData = (data: string) => {
    setSelected(data)
  }
  // func(selected)
  // console.log('I was picked', opened )

  if (dropDown === true) {
    return (
      <animated.div
        style={animation}
      >
        <Paper className={formDisplay}>
          <div className={tabRoot}>
            <TabsContainer>
              <StaticTab
                label={tabTitle1}
                dropDown={true}
                opened={opened}
                openDrop={onHandleOpen}
              />
              {tabTitle2 &&
                <StaticTab
                  label={tabTitle2}
                />
              }
            </TabsContainer>
            {opened ? <DropDown calculators={calculatorList} func={pullData} /> : null}

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
