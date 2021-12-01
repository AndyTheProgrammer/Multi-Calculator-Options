import React from 'react'
import { routes } from './routes'
import TestPage from '../components/pages/testPage'
import { HomePage } from '../components/pages/homePage'
import { Switch, Route, useHistory, Redirect, useParams, useRouteMatch } from "react-router-dom";

export default function RouterLinks() {
    return (
        <Switch>
            {routes.map((route, i) => (
                <Route
                    key={route.name}
                    path={route.path}
                    exact
                >
                    {<route.component />}
                </Route>
            ))}
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route path="/testpage">
                <TestPage />
            </Route>

        </Switch>
    );
}
