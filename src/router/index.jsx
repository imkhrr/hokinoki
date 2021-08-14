import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as Middleware from "../middleware/auth";
import Items from "../views/Items";
import Users from "../views/Users";
import Dashboard from "../views/Dashboard";
import LoginPage from "../views/LoginPage";
import NotFound from "../views/NotFound";
import Transactions from "../views/Transactions";
import Customers from "../views/Customers";
// import Settings from "../views/Settings";
import StoreHouse from "../views/StroreHouse";

import SellReport from "../views/SellReport";

function Router(props) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Middleware.Authenticated>
                            <Dashboard />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/transactions">
                        <Middleware.Authenticated>
                            <Transactions />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/items">
                        <Middleware.Authenticated>
                                <Items />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/users">
                        <Middleware.Authenticated>
                                <Users />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/customers">
                        <Middleware.Authenticated>
                                <Customers />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/storehouse" >
                        <Middleware.Authenticated>
                                <StoreHouse />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/selling-report">
                        <Middleware.Authenticated>
                                <SellReport />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/statistics">
                        <Middleware.Authenticated>
                                <StoreHouse />
                        </Middleware.Authenticated>
                    </Route>
{/* 
                    <Route path="/settings">
                        <Middleware.Authenticated>
                            <Settings />
                        </Middleware.Authenticated>
                    </Route> */}

                    {/* Guest Route */}
                    <Route path="/login">
                        <Middleware.Guest>
                            <LoginPage />
                        </Middleware.Guest>
                    </Route>

                    {/* Error Route */}
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Router;
