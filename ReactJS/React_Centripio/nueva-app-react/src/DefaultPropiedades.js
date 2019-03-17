import React, {Component} from 'react'
import Item from './Item'

// Segunda forma de enviar valores a los  componente es a travez de los Propiedades
// Las propiedades a diferencia del estado tiene la caracteristica
// que no son mutables. Uba vez que lo resiba el compoente por ningun motivo se puede
// Esto es lo que hace que un compoente padre mande datos a un componente hijo.

class Propiedades extends Component{
  constructor(args){
      super(args)
      // El estado inicia con una lista vacia
      this.state = {
        users: []
      }
  }

  // Mandar valores a partide las propiedades.
  // La propiedades tiene la caracteristica que no son
  // mutables.
  // - El estado lo utlizamos para mutarlo para intereactuar con la pantalla (usuario).
  // En el estado podemos guardar imagenes, tablas u otro dato.
  // - Las propiedades son recibidas por el componente padre ya
  //  no puede ser alteradas.

  delete(id) {
    const userIndex = this.state.users.map( x => {return x.id}).indexOf(id)
    let users = this.state.users
    users.splice(userIndex, 1)
    this.setState({
      users: users
    })
  }

  add(e) {
    const nameInput = document.getElementById('name')
    const roleInput = document.getElementById('role')
    const telInput = document.getElementById('tel')

    let users = this.state.users

    users.unshift({
      id: new Date().getTime(),
      name: nameInput.value,
      role: roleInput.value,
      tel: telInput.value,
    })

    this.setState({
      users: users
    })

    console.log(this.state);

    nameInput.value=''
    roleInput.value=''
    telInput.value=''
  }

  render(){
    console.log('render => ')

    return (
      <div>

        <label>Nombre</label>
        <input id="name" type="text"/>
        <br/>
        <label>Rol</label>
        <input id="role" type="text"/>
        <br/>
        <label>Tel</label>
        <input id="tel" type="text"/>
        <br/>
        <button onClick={this.add.bind(this)}>
          Agregar
        </button>

        {/* ASI SE COMENTA EN ESTA SECCION
         Iteramos el arreglo que viene a ser el estado
         Estos atributos en contruir se combierte en propiedades.
         id, name , role ...
        */}

        <ul>
          {
            this.state.users.map(user => {
              // Compoente ITEM
              return <Item key={user.id}
                id={user.id}
                name={user.name}
                role={user.role}
                tel={user.tel}
                deleteOp={this.delete.bind(this)} />
            })
          }
        </ul>
      </div>
      );
    }
}
// Para utilizar este componente se debe de exportar.
export default Propiedades;
