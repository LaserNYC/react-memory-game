import React, { Component, Fragment } from 'react';
import { inject, observer }  from 'mobx-react'

class Hello extends Component {
  render() {
    const { MainStore } = this.props;
    return (
      <Fragment>
        <div>{MainStore.someText}</div>
        <button onClick={MainStore.toggleText}>Toggle Text</button>
      </Fragment>
    )
  }
}


Hello = inject('MainStore')(observer(Hello));
export default Hello