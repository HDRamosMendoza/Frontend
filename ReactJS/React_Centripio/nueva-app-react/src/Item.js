import React from 'react'
import PropTypes from 'prop-types'

class Item extends React.Component {

  static defaultProps = {
    role: 'Invitado'
  }

  render(){
    let id = this.props.id
    let name = this.props.name
    let role = this.props.role
    let tel = this.props.tel

    return (
      <li>
        {name} - {role} ({tel})
        <button onClick={() => this.props.deleteOp(id)}>
          X
        </button>
      </li>
    )
  }
}

// Item.defaultProps = {
//  role: 'Invitado'
// }

Item.propTypes = {
  name: PropTypes.string.isRequired,
  tel: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  deleteOp: PropTypes.func.isRequired
}

export default Item;
