import React, { Component }   from 'react'
import { inject, observer }   from 'mobx-react'
import Timer                  from './Timer'
import Select                 from './Select'

class TopBar extends Component {

  render(){
    const { MainStore } = this.props
    return (
      <div className="top-bar">
        <Timer />
        <div className="moves">Moves: {Math.floor(MainStore.moves)}</div>
        <Select />
        <p className="title">Memory</p>
      </div>
    )
  }
}

TopBar = inject('MainStore')(observer(TopBar));

export default TopBar