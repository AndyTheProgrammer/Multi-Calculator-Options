import * as React from 'react'
import { List, ListItem, ListItemText, Box } from '@mui/material';

import { Font, FontProvider } from "../font";
import { COLORS } from "../../common/shared";
import useStyles from '../../styling/CustomStyles'

interface DropProps {
  id?: String;
  calculators: [];
  selectedValue?: any;
  measurement?: any;
  onClose?: any;
  col?: Boolean;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
}

const CustomSelect = (props: DropProps) => {
  const { id, onClose, selectedValue, calculators } = props
  const [state, setState] = React.useState({ left: false });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchor = "";
  const {
    list,
    listItem,
    fullList
  }: any = useStyles()

  const toggleDropdown = (anchor: any, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: any) => {
    onClose(value);
  };

  const drop = (anchor: any) => (
    <div
      onClick={toggleDropdown(anchor, false)}
      onKeyDown={toggleDropdown(anchor, false)}
    >
      <FontProvider fonts={[{ font: "Raleway" }]}>
        <List sx={{ color: COLORS.text }} className='text-center'>
          {calculators.map((item: any) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item.calcName)}
              key={item.calcName}
            >
              <Font>
                <ListItemText primary={item.calcName} />
              </Font>
            </ListItem>
          ))}
        </List>
      </FontProvider>
    </div>
  );

  return (
    <Box sx={{ backgroundColor: 'red' }}>

    </Box>
  )
}

export default CustomSelect
