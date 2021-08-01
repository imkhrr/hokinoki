import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as Middleware from "../middleware/auth";
import Items from "../views/Items";
import Users from "../views/Users";
import Dashboard from "../views/Dashboard";
import LoginPage from "../views/LoginPage";
import NotFound from "../views/NotFound";
import Transaksi from "../views/Transaksi";
import Customers from "../views/Customers";
import Settings from "../views/Settings";
import RestrictedPage from "../middleware/forbiden/RestrictedPage";

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

                    <Route path="/transaksi">
                        <Middleware.Authenticated>
                            <Transaksi />
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/items">
                        <Middleware.Authenticated>
                            <RestrictedPage forRole="cashier">
                                <Items />
                            </RestrictedPage>
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/users">
                        <Middleware.Authenticated>
                            <RestrictedPage forRole="cashier">
                                <Users />
                            </RestrictedPage>
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/customers">
                        <Middleware.Authenticated>
                            <RestrictedPage forRole="cashier">
                                <Customers />
                            </RestrictedPage>
                        </Middleware.Authenticated>
                    </Route>

                    <Route path="/settings">
                        <Middleware.Authenticated>
                            <Settings />
                        </Middleware.Authenticated>
                    </Route>

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
