import React from 'react'

// Este es la PRIMERA forma de crear un COMPONENTE
class StatelesComponent extends React.Component{
  constructor(args){
      super(args)

      this.state = {}
  }
  // Render tiene la funcionalidad de generar la vista jxs
  // que es muy parecido a HTML.
  render(){
    return (
      <h1>Hola Mundo</h1>
    )
  }
}
// Para utilizar este componente se debe de exportar.
export default StatelesComponent
