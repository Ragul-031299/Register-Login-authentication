import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

import Registration from "./components/Registration";

import Login from "./components/Login";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
 
        <Route path="/registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />



      </Routes>
    </Router>
);
