import React, { Component } from 'react';
import logo from './images/logo.svg';
import './css/Header.css';
//Todos los componentes necesitan un metodo RENDER
//React trabaja con un jsx. Una especie de html en donde podemos
//ejecutar componentes.
class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="Logo">
          <img src={logo} alt="logo" />
          <h2>Welcome to React</h2>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Header;