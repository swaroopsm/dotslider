import React, { Component } from 'react';

export default class Slide extends Component {

  getStyle() {
    return {
      width: this.props.width + '%'
    };
  }

  render() {
    return (
      <div className='slide' style={ this.getStyle() }>
        { this.props.children }
      </div>
    )
  }
}
