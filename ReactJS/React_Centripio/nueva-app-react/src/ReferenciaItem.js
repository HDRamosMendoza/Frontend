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
    //let input = document.getElementById("input");
    let input = this.input
    input.focus()
    input.select()
  }

  edit(e){
    this.setState(update(this.state, {
      edit: {$apply: x => {return !x}}
    }))
  }

  save(e){
    if(e.keyCode === 13){
      this.setState(update(
        this.state, {
          edit: {$apply: x => {return !x}},
          text: {$set: e.target.value}
        }
      ))
    }
  }
  // EVITAR de usar REFERENCIA ya que se salta todo el ciclo
  // de vida de react.
  // NO SE TERMINO DE COPIAR todo el codigo del ejemplo
  // Mini curso de React (7): Refs

  render(){
    return (
      <div className={'card' + this.state.color}>
        <input
          onKeyUp={this.save.bind(this)}
          defaultValue={this.state.text}
          //input pasara como parametro a la funcion.
          // despues this.input lo igualo a input.
          // Lo que sucede que estoy creando una variable a nivel de clase
          // y que su valor es igual a mi campo de texto.
          // this.input guarda la referencia del input. Si se crea n instancia
          // de mi componenete cada uno su this.input es diferente. Yo lo puedo
          // rederencia sin la necesidad de usar un ID. Solo son accesibles si tengo
          // acceso a su referencia.
          ref={input => this.input = input}
          style={{display: this.state.edit ? 'inline-block' : 'none'}}
          />
          <p> style={{display: this.state.edit ? 'none' : 'inline-block'}}</p>

          <button
            onClick={this.edit.bind(this)}
            className="btn btn-default btn-sm"
            style={{display: this.state.edit ? 'none' : 'inline-block'}}>
            <i className="fa fa-pencil fa-lg"/>
          </button>
      </div>
    )
  }
}
// Para utilizar este componente se debe de exportar.
export default Referencia
