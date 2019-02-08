import React, { Component } from 'react'
import { inject, observer }  from 'mobx-react'

class Tile extends Component {

  state = {
    revealed: false
  }

  reveal = () => {
    // disallow interaction when flipped (let the timer take care of it)
    if (this.state.revealed) { return }

    this.setState((prevState, props) => ({
      revealed: !prevState.revealed
    }), () => {
      // if tile is showing, check for a match
      if (this.state.revealed){
        this.props.MainStore.selectTile(this.props.glyph);
      }
    });
  }

  componentDidUpdate(){
    if (this.props.hiderevealed && this.state.revealed && !this.props.match){
      setTimeout( () => {
        this.setState({revealed: false});
      }, 1200);
    }
  }

  render(){
    return (
      <div className={`tile${this.state.revealed ? ' reveal' : ''}${this.props.match ? ' match' : ''}`} onClick={this.reveal}>
        <div className="inner">
          <span className={`icon-${this.props.glyph} card`}></span>
        </div>
      </div>
    )
  }
}

Tile = inject('MainStore')(observer(Tile));

export default Tile