import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import "./bootstrap.min.css";

import Home from "./components/Home";

function App(props) {
  return (
    <Router>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Navbar.Toggle aria-controls="navbarColor01" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/home">Traning</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Route render={() => <Home />} path="/home" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
