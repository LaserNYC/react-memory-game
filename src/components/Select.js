import React, { Component }   from 'react'
import { inject, observer }   from 'mobx-react'

class Select extends Component {

  state = {
    value: 'easy'
  }

  handleChange = (e) => {
    let value = e.target.value;
    if (value !== 'select'){
      this.setState({ value }, () => {
        this.props.MainStore.initNewGame(value);
      });
    }
  }

  render(){
    const { MainStore } = this.props
    return (
      <div className="difficulty">
        <select disabled={!MainStore.enableDifficultySelection} onChange={this.handleChange} value={this.state.value}>
          <option value={'select'}>Select Difficulty</option>
          <option value={'easy'}>Easy Mode</option>
          <option value={'hard'}>Hard Mode</option>
        </select>
      </div>
    )
  }
}

Select = inject('MainStore')(observer(Select));

export default Select