import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

// Components
import Header from './Global/Header'
import Content from './Global/Content'
import Footer from './Global/Footer'

//Todos los componentes necesitan un metodo RENDER
//React trabaja con un jsx. Una especie de html en donde podemos
//ejecutar componentes.
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
        <Footer /> 
      </div>
    );
  }
}

export default App;