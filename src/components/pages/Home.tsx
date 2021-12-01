// eslint-disable-next-line no-use-before-define
import React from "react";
import { fetchGetUnits } from "../../redux/slice/GetUnits";
import { useDispatch } from "react-redux";

import Math from "./mainPages/Math";
import useStyles from '../../styling/CustomStyles'
import "../../styling/App.css";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const bootStrap = () => {
      dispatch(fetchGetUnits());
    };
    bootStrap();
  }, []);
  return (
    <>
      <Math />
    </>
  );
};

export default Home;
