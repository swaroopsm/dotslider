import React, { Component } from 'react';

export default class Navigator extends Component {

  getPropsForChild(index, children) {
    let { onMouseOver, onMouseLeave } = this.props;
    let props = {
      onClick: this.props.onClick.bind(null, index + 1),
      className: this.isActive(index, children) ? 'active' : ''
    };

    if(onMouseOver && onMouseLeave) {
      props.onMouseOver = onMouseOver;
      props.onMouseLeave = onMouseLeave;
    }

    return props;
  }

  isActive(i, children) {
    return this.props.active === i + 1 ||
           ( i === children - 1 && this.props.active === 0 ) ||
           ( this.props.active === this.props.totalChildren - 1 && i === 0 );
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
    if(this.props.useDefault) {
      return this.renderDefaultNavigator()
    }

    return (
      <div className='dotslider-navigation'>
        { this.renderChildren() }
      </div>
    )
  }
}
