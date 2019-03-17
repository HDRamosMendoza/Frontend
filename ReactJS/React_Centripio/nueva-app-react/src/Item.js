import React from 'react'
import PropTypes from 'prop-types'

class Item extends React.Component {

  static defaultProps = {
    role: 'Invitado'
  }

  render(){
    /* PRIMERA FORMA
    let id = this.props.id
    let name = this.props.name
    let role = this.props.role
    let tel = this.props.tel

    PRIMERA FORMA
      {name} - {role} ({tel})

    */

    let user = this.props.user

    return (
      <li>
        {/*SEGUNDA FORMA*/}
        {user.name} - {user.role} ({user.tel})
        <button onClick={() => this.props.deleteOp(user.id)}>
          X
        </button>
      </li>
    )
  }
}

// Item.defaultProps = {
//  role: 'Invitado'
// }
/*
PRIMERA FORMA
Item.propTypes = {
  name: PropTypes.string.isRequired,
  tel: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  deleteOp: PropTypes.func.isRequired
}*/
// Segunda FORMA
Item.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tel: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  deleteOp: PropTypes.func.isRequired
}
export default Item;
