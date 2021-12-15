import React from 'react'
import { routes } from './routes'
import TestPage from '../components/pages/testPage'
import { HomePage } from '../components/pages/homePage'
import { Switch, Route, useHistory, Redirect, useParams, useRouteMatch } from "react-router-dom";
import { mathRoutes, othersRoutes, financialRoutes } from './routes'

export default function RouterLinks() {
    return (
        <Switch>
            {routes.map((route, i) => (
                <Route
                    key={route.name}
                    path={route.path}
                    exact>
                    {<route.component />}
                </Route>
            ))}
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route path="/testpage">
                <TestPage />
            </Route>

            {/* Math routes */}
            {
                mathRoutes.subCategories[0].sub_calculator.map((r:any) => {
                return (
                    <Route key={r} path={r.path}>
                        <r.component />
                    </Route>
                );
                })
            }
                      {
            mathRoutes.subCategories[1].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[2].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[3].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[4].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
           {
            mathRoutes.subCategories[5].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }

            {/*Financial routes */}
            {
            financialRoutes.subCategories[0].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }
          {
            financialRoutes.subCategories[1].sub_calculator.map((r:any) => {
              return (
                <Route key={r} path={r.path}>
                  <r.component />
                </Route>
              );
            })
          }

            {/* Other routes */}
            { othersRoutes.subCategories[5].sub_calculator.map((route, i) => (
                <Route key={route.name} path={route.path} >{
                      <route.component />
                }</Route>
            ))}
            

        </Switch>
    );
}
