import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Font, FontProvider } from "../../font";
import { COLORS } from "../../../common/shared";

function SimpleDialog(props: any) {
  const { onClose, selectedValue, open, dropOptions } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: any) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      maxWidth='xs'
    >
      <FontProvider fonts={[{ font: "Raleway" }]}>
        <Font>
          <DialogTitle
            className="text-center"
            sx={{ color: COLORS.text }}
            id="simple-dialog-title"
          >
            Select Calculator
          </DialogTitle>
        </Font>
        <List sx={{ color: COLORS.text }} className='text-center'>
          {dropOptions.map((item: any) => (
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
    </Dialog>
  );
}

export default SimpleDialog
