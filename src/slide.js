import React, { Component } from 'react';
import assign from 'object.assign';

export default class Slide extends Component {

  getStyle() {
    return {
      width: this.props.width + '%',
      float: 'left'
    };
  }

  getProps() {
    let { onMouseOver, onMouseLeave } = this.props;

    let props = {
      className: 'dotslider-slide',
      style: this.getStyle()
    };

    if(this.props.onMouseOver && this.props.onMouseLeave) {
      props = assign(props, {
        onMouseOver,
        onMouseLeave
      });
    }

    return props;
  }

  render() {
    return (
      <div {...this.getProps()}>
        { this.props.children }
      </div>
    )
  }
}
