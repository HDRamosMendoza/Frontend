import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

// Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';

// Data
import items from '../data/menu';

//Todos los componentes necesitan un metodo RENDER
//React trabaja con un jsx. Una especie de html en donde podemos
//ejecutar componentes.
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="CodeJobs" items={items}/>
        <Content />
        <Footer copyright="&copy; Codejobs 2017"/> 
      </div>
    );
  }
}

export default App;