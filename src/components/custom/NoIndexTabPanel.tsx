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
      <FontProvider fonts={[{ font: 'Varela Round' }]}>
        <Box
          p={5}
          sx={{ color: COLORS.text }}
        >
          <Font>{children}</Font>
        </Box>
      </FontProvider>
    </div>
  );
}

export default NoIndexTabPanel
