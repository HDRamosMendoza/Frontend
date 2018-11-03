import React, { Component } from 'react';

import './css/Content.css';

class Content extends Component {
  // - El constructor se el primero que se ejecuta
  // - El SUPER se usa para tener acceso al objeto 
  // THIS de la clase.
  // - Si tenemos que leer los PROPS se debe de pasar en el
  // CONSTRUCTOR y en el SUPER los PROPS.
  constructor(){
    super();
    //console.log(this.props);
    this.state = {
      count: 0,
      number1: 0,
      number2: 0,
      result: 0
    };

    // El BIND  se utiliza para pasar de un contexto a otro.
    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  // - Sivre para ver si nuestro componente ya cargo.
  componentDidMount() {
     this.setState({
      count: 1
     });
  }

  handleCountClick(e) {
    //console.log(e);
    if(e.target.id === 'add') {
      this.setState({
        count: this.state.count + 1
      });
    } else if(e.target.id === 'subtract' && this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      });
    } else {
      this.setState({
        count: 0
      });
    }
  }

  handleResultClick(e) {
    console.log("RESET");
    this.setState({
      result: this.state.number1 + this.state.number2 
    });
  }

  handleResetClick(e){
    this.setState({
      count: 0
    });
  }

  handleInputChanged(e) {
    if(e.target.id === 'number1') {
      this.setState({
        number1: Number(e.target.value)
      });
    } else {
      this.setState({
        number2: Number(e.target.value)
      });
    }
  }

  // - Cuando el STATE cambia el RENDER se vuelve a ejecutar.
  render() {
    console.log('Ejecuta Render');
    return (
      <div className="Content">
        <h3>Counter: {this.state.count}</h3>
        <p>
          <button id="add" onClick={this.handleCountClick}>+</button>
          <button id="subtract" onClick={this.handleCountClick}>-</button>
          <button id="reset" onClick={this.handleResetClick}>Reset</button>
        </p>

        <h2>Calculadora</h2>

        <p>
          <input id="number1" type="number" value={this.state.number1} onChange={this.handleInputChanged}/>
          +
          <input id="number2" type="number" value={this.state.number2} onChange={this.handleInputChanged}/>

          <button id="result" onClick={this.handleResultClick}>=</button>

          {this.state.result}
        </p>

      </div>
    );
  }
}

export default Content;