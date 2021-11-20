import React from "react";
import { Switch, Route } from "react-router-dom";
import CurrencyConveter from "../Components/Pages/Main/CurrencyConveter";

import {
  Volume,
  SurfaceArea,
  Area,
  Statistics,
  Health,
  Finance,
  Other,
} from "./../Components/Pages";

function AppRoutes() {
  const pages = [
    {
      component: Volume,
      path: "/",
      name: "Volume Calculators",
    },
    {
      component: SurfaceArea,
      path: "/surface_area",
      name: "Surface Area Calculators",
    },
    {
      component: Area,
      path: "/area",
      name: "Area Calculators",
    },
    {
      component: Health,
      path: "/fitness&health",
      name: "Fitness and Health Calculators",
    },
    {
      component: Statistics,
      path: "/statistics",
      name: "Statistics Calculators",
    },
    {
      component: Finance,
      path: "/finance",
      name: "Financial Calculators",
    },
    {
      component: Other,
      path: "/other_calculators",
      name: "Other Calculators",
    },
    {
      component: CurrencyConveter,
      path: "/CurrencyConveter",
      name: "Currency Conveter",
    },
  ];

  return (
    <Switch>
      {pages.map((item) => {
        const { component, path, name } = item;
        return (
          <Route
            key={item}
            path={path}
            pageName={name}
            exact
            component={component}
          />
        );
      })}
    </Switch>
  );
}

export default AppRoutes;
