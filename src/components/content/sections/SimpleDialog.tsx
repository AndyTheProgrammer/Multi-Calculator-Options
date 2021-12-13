import React from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { Font, FontProvider } from "../../font";

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
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <FontProvider fonts={[{ font: "Raleway" }]}>
        <Font>
          <DialogTitle id="simple-dialog-title">
            Select Statistic Calculator
          </DialogTitle>
        </Font>
        <List>
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
