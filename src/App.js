import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Local } from "./local";
import { Hourly } from "./hourly";
import { Extended } from "./extended";
import { Custom404 } from "./custom404";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';
import { useState } from 'react';

function App() {

  /* Maybe replace state with cookie or localstorage */
  const [citySelected, setCitySelected] = useState({value: 'Detroit', label: 'Detroit'})

  const options = [
    {value: 'Detroit', label: 'Detroit'},
    {value: 'Seattle', label: 'Seattle'},
    {value: 'London', label: 'London'},
    {value: 'Paris', label: 'Paris'},
    {value: 'Beijing', label: 'Beijing'}
  ]
  return (
    <div className="App-wrapper">
      <header className="App-header">
        <h1>Weather report</h1>
      </header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container style={{marginLeft: '30px'}}>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Local</Nav.Link>
              <Nav.Link as={Link} to="/hourly">Hourly</Nav.Link>
              <Nav.Link as={Link} to="/extended">Extended</Nav.Link>
              <Select className="citySelect" options={options} defaultValue={options[0]} onChange={event => setCitySelected(event)}></Select>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Local />} />
        <Route path="/hourly" element={<Hourly />} />
        <Route path="/extended" element={<Extended />} />
        <Route path="*" element={<Custom404 />} />
      </Routes>
      <footer className="App-footer">
        <p>Copyright {new Date().getFullYear()}. Light photo created by Racool_studio - <a href='https://www.freepik.com/photos/light'>www.freepik.com</a></p>
      </footer>
    </div>
    
  );

}

export default App;
