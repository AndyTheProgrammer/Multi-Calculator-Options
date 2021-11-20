import React from "react";
import Box from "@material-ui/core/Box";
import { red } from "@material-ui/core/colors";
import { NavMenu, NavItem } from "@mui-treasury/components/menu/navigation";
import { usePointNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/point";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

import useStyles from "./../../../Styling/CustomStyles";
import { Font, FontProvider } from "../../Font";
import { COLORS } from "../../../Common/shared";
const NavBar = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handleClick = (i, path) => (e) => {
    e.preventDefault();
    history.push(path);
    setIndex(i);
  };

  const navLinks = [
    {
      linkName: "Volume",
      tag: "div",
      idx: 0,
      onClick: handleClick(0, "/"),
    },
    {
      linkName: "Surface Area",
      tag: "div",
      idx: 1,
      onClick: handleClick(1, "/surface_area"),
    },
    {
      linkName: "Area",
      tag: "div",
      idx: 2,
      onClick: handleClick(2, "/area"),
    },
    {
      linkName: "Fitness and Health",
      tag: "div",
      idx: 3,
      onClick: handleClick(3, "/fitness&health"),
    },
    {
      linkName: "Statistics",
      tag: "div",
      idx: 4,
      onClick: handleClick(4, "/statistics"),
    },
    {
      linkName: "Finance",
      tag: "div",
      idx: 5,
      onClick: handleClick(5, "/finance"),
    },
    {
      linkName: "Other",
      tag: "div",
      idx: 6,
      onClick: handleClick(6, "/other_calculators"),
    },
    {
      linkName: "Currency",
      tag: "div",
      idx: 7,
      onClick: handleClick(6, "/CurrencyConveter"),
    },
  ];

  return (
    <Box height={46} display={"flex"}>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* Top Nav */}
            <FontProvider fonts={[{ font: "Varela Round" }]}>
              <NavMenu useStyles={usePointNavigationMenuStyles}>
                {navLinks.map((item) => {
                  const { linkName, tag, idx, onClick } = item;
                  return (
                    <NavItem as={tag} active={index === idx} onClick={onClick}>
                      <Font color={COLORS.light_text_color}>{linkName}</Font>
                    </NavItem>
                  );
                })}
              </NavMenu>
            </FontProvider>
            {/* End Top Nav */}
          </Toolbar>
        </AppBar>
      </div>
    </Box>
  );
};

export default withRouter(NavBar);
