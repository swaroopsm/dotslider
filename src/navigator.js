import React, { Component } from 'react';

export default class Navigator extends Component {

  getPropsForChild(index, children) {
    let { onMouseOver, onMouseLeave, onTouchEnd } = this.props;
    let props = {
      onClick: this.props.onClick.bind(null, index + 1),
      className: this.isActive(index, children) ? 'active' : '',
      active: this.isActive(index, children),
      onTouchStart: this.props.onClick.bind(null, index + 1)
    };

    if(onMouseLeave) {
      props.onMouseLeave = onMouseLeave;
    }

    if(onTouchEnd) {
      props.onTouchEnd = onTouchEnd;
    }

    return props;
  }

  isActive(i, children) {
    let active = this.props.getActive();

    return active === i + 1 ||
           ( i === children - 1 && active === 0 ) ||
           ( active === this.props.totalChildren - 1 && i === 0 );
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, this.getPropsForChild(index, this.props.children.length));
    });
  }

  renderDefaultNavigator() {
    let dots = [];

    for(let i=0, length=this.props.actualChildren; i<length; i++) {
      dots.push(
        <li { ...this.getPropsForChild(i, length) } key={ i } />
      );
    }

    return <ul className='dotslider-navigation dotslider-navigation-default'>{ dots }</ul>
  }
  
  render() {
    let className = 'dotslider-navigation';

    if(this.props.useDefault) {
      return this.renderDefaultNavigator()
    }

    className = this.props.className ? className += ` ${this.props.className}` : className;

    return (
      React.createElement(this.props.el, { className }, this.renderChildren())
    )
  }
}

// Default Props
Navigator.defaultProps = {
  el: 'div'
};
