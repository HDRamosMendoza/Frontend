import React, {Component} from 'react'

class Formulario extends Component{
  constructor(args){
    super(args)
    this.state = {
      username:'HDRamosMendoza',
      name:'H. Daniel Ramos Mendoza',
      languaje:'es',
      about:'DveloperGIS',
      acept: true,
      gender:'m',
      message:''
    }
  }

  onChange(e) {
    if(e.target.name === "acept") {
      this.setState({
        [e.target.name]: e.target.checked
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  save(e) {
    if(!this.validate()){
      return;
    }

    this.setState({
      message: "Guardado correctamente"
    })
  }

  validate(){
    if(this.state.acept != true) {
      this.setState({
        message: 'Acepte los terminos y condiciones'
      })
      return false
    }
    return true
  }

  render(){
    console.log('render => ')
    return (
      <div className="FormApp">
        <label htmlForm="username">Usuario</label>
        <input
          type="text" id="username"
          name="username" value={this.state.username}
          onChange={this.onChange.bind(this)} />

        <label htmlForm="name">Nombre</label>
        <input
          type="text" id="name"
          name="name" value={this.state.name}
          onChange={this.onChange.bind(this)} />

        <label htmlForm="languaje">Lenguaje</label>
        <select id="languaje" name="languaje"
          onChange={this.onChange.bind(this)}
          value={this.state.languaje}>
          <option value="">Seleccione</option>
          <option value="es">Español</option>
          <option value="en">Ingles</option>
          <option value="de">Alemán</option>
        </select>

        <label htmlForm="gender">Genero</label>
        <input type="radio" name="gender" value="m"
          onChange={this.onChange.bind(this)} checked={this.state.gender === 'm'} /> Hombre
        <input type="radio" name="gender" value="w"
          onChange={this.onChange.bind(this)} checked={this.state.gender === 'w'} /> Mujer

        <label htmlForm="about">Cuentanos algo de ti</label>
        <textarea name="about" id="about"
          value={this.state.about}
          onChange={this.onChange.bind(this)} />

        <div>
          <input type="checkbox" name="acept" id="acept"
            value={this.state.acept}
            onChange={this.onChange.bind(this)}
            checked={this.state.acept}/> Aceptas terminos y condiciones.
        </div>

        <div>
          <button onClick={this.save.bind(this)}>Guardar</button>
          <span style={{color:'green'}}>{this.state.message}</span>
        </div>
        <div>
          <span>{JSON.stringify(this.state)}</span>
        </div>

      </div>
      );
    }
}

export default Formulario;
