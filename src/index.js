import React from "react";
import ReactDOM from "react-dom";

import "./styles/index.css";
import "./styles/colors.css";
import "./styles/typography.css";
import "./styles/spacing.css";
import "rsuite/dist/styles/rsuite-default.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./views/LoginPage";
import Transaksi from "./views/Transaksi";
import Dashboard from "./views/Dashboard";
import Items from "./views/Items";
import Customers from "./views/Customers";
import Suppliers from "./views/Suppliers";
import Users from "./views/Users";

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
