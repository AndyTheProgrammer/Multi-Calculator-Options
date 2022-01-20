import React from 'react';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";

import { COLORS } from "../../common/shared";
import { Font, FontProvider } from '../font'

interface TabPanelProps {
  children?: React.ReactNode;
}

const NoIndexTabPanel = (props: TabPanelProps) => {
  const { children, ...other } = props;

  return (
    <div
      role="tabpanel"
      {...other}
    >
      <FontProvider fonts={[{ font: 'Roboto' }]}>
        <Box
          pt={1}
          pl={1}
          pr={1}
          pb={0}
        >
          <Font>{children}</Font>
        </Box>
      </FontProvider>
    </div>
  );
}

export default NoIndexTabPanel
