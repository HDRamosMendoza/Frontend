/*
Refs es como el ID en html.
*/

import React from 'react'

class Referencia extends React.Component{
  constructor(args){
      super(args)

      let colors = ['default', 'red', ''];
      let cardColor = colors[Math.floor(Math.random() * (colors.length-))]

      this.state = {
        edit: false,
        color: cardColor,
        text: this.props.todo.text
      }
  }

  componentDidUpdate(){

  }

  edit(e){
    this.setState(update(this.state, {
      edit: {$apply: x => {return !x}}
    }))
  }

  save(e){
    if(e.keyCode === 13){
      edit: {$apply: x => {return !x}},
      text: {$set: e.target.value}
    }
  }

  render(){
    return (
      <h1>Hola Mundo</h1>
    )
  }
}
// Para utilizar este componente se debe de exportar.
export default Referencia
