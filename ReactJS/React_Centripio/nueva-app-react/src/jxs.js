import React from 'react'
//import StatelesComponent from  './StatelesComponent'
//import StatusFullComponent from  './StatusFullComponent'

class App extends Component {

  evento(e) {
    alert(e.target.value);
  }

  render() {
    let calculo1 = 2 + 8;
    let style = null, style2 = null,style3 = null;
    let calculo2 = 10;
    let calculo3 = 11;

    if(calculo2 == 10){
      style2 = {color: 'red'}
    }else{
      style2 = {color: 'green'}
    }

    if(calculo3 == 10){
      style3 = {color: 'red'}
    }else{
      style3 = {color: 'green'}
    }


    return (
      <div>
        //<StatelesComponent />
        //<StatusFullComponent/>

        <h1>Hola Mundo</h1>
        <h1>desde JSX</h1>

        <input
          onClick={this.evento.bind(this)}
          type="text"
          value="hola mundo 1"
          style = {{color: 'red', backgroundColor: 'blue'}}/>
          {calculo1 + 2}

          <input
            onClick={this.evento.bind(this)}
            type="text"
            value="hola mundo 2"
            className={calculo2 == 10 ? 'red':'green'}
            style = {style2}/>

          <input
            onClick={this.evento.bind(this)}
            type="text"
            value="hola mundo 3"
            style = {style3}/>
      </div>
    );
  }
}

export default App;
