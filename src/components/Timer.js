import React, { Component } from 'react'
import { inject, observer }  from 'mobx-react'

class Timer extends Component {

  min = 0;
  sec = 0;

  convertTime(seconds) {
    // every 60 seconds, reset seconds to 0 and increment minutes by 1
    if (seconds % 60 === 0 && seconds > 0){
      this.min++
      this.sec = 0;
    }

    // otherwise, just count up to 60
    else {
      this.sec = seconds % 60
    }

    return `${this.min}:${this.sec < 10 ? '0' + this.sec : this.sec}`
  }

  render(){
    return (
      <div className="timer">{this.convertTime(this.props.MainStore.time)}</div>
    )
  }
}

Timer = inject('MainStore')(observer(Timer));

export default Timer