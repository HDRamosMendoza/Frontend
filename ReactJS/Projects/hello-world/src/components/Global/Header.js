import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Assets
import logo from './images/logo.svg';
import './css/Header.css';
//Todos los componentes necesitan un metodo RENDER
//React trabaja con un jsx. Una especie de html en donde podemos
//ejecutar componentes.
class Header extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };
  
  render() {
    //console.log(this.props);
    const {title, items} = this.props;
    //const title = this.props.title;
    //const items = this.props.items;

    return (
      <div className="Header">
        <header className="Logo">
          <img src={logo} alt="logo" />
          <h2>{title}</h2>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <ul className="Menu">
            {items && items.map((item,key) => <li key={key}>{item.title}</li>)}
          </ul>
        </header>
      </div>
    );
  }
}

export default Header;