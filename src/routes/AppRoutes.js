import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Math,
  Statistics,
  Health,
  Finance,
  Other,
} from "./../Components/Pages";

function AppRoutes() {
  const pages = [
    {
      component: Math,
      path: "/",
      name: "Math Calculators",
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
