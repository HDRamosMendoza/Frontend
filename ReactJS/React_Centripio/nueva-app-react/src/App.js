import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import StatelesComponent from  './StatelesComponent'
// import StatusFullComponent from  './StatusFullComponent'
 import DefaultPropiedades from  './DefaultPropiedades'

class App extends Component {
  constructor(args){
    super(args)
    // Inicializamos el constructor
    this.state = {
      counter: 0
    }
  }

  sumar(e) {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  restar(e) {
    this.setState({
      counter: this.state.counter - 1
    })
  }

  render() {
    console.log('render =>');
    return (
      <div>
        <span>Contador {this.state.counter}</span>
        <div>
          <button onClick={this.sumar.bind(this)}>+</button>
          <button onClick={this.restar.bind(this)}>-</button>
        </div>
        <DefaultPropiedades/>
      </div>
    /*  <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>*/

    );
  }
}

export default App;
