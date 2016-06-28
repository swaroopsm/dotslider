import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import assign from 'object.assign';

export default class Slider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      isAnimating: false
    };

    this.navigateForward = this.navigateForward.bind(this);
    this.navigateBackward = this.navigateBackward.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.startAnimationLoop = this.startAnimationLoop.bind(this);
    this.stopAnimationLoop = this.stopAnimationLoop.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchStop = this.handleTouchStop.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  hasMounted() {
    return typeof this.$el !== 'undefined';
  }

  handleMouseOver() {
    this.stopAnimationLoop();
  }

  handleMouseLeave() {
    this.stopAnimation = false;
    this.startAnimationLoop();
  }

  calculateSlidePosition(i) {
    return i+1;
  }

  renderDots() {
    let dots = [],
        className = 'dot';

    for(var i=0; i<this.props.children.length; i++) {
      className = this.state.active === i+1 ||
                  ( i === this.props.children.length - 1 && this.state.active === 0 ) ||
                  ( this.state.active === this.getChildrenCount() - 1 && i === 0 )
                  ? 'dot active' : 'dot';
      dots.push(<div className={ className } key={ i } onClick={ this.goToSlide.bind(this, this.calculateSlidePosition(i)) }></div>)
    }

    return <div className='dots-wrapper'>{ dots }</div>;
  }

  renderControls() {
    let { nextIcon, prevIcon } = this.props;

    return (
      <div className='slider-controls'>
        { React.cloneElement(prevIcon, { onClick: this.navigateBackward }) }
        { React.cloneElement(nextIcon, { onClick: this.navigateForward }) }
      </div>
    )
    
  }

  renderSlides() {
    let itemWidth = this.getItemWidth(),
        children = [],
        lastChild = this.props.children[this.props.children.length - 1],
        firstChild = this.props.children[0],
        props = { width: itemWidth };

      if(this.props.pauseOnHover) {
        props.onMouseOver = this.handleMouseOver;
        props.onMouseLeave = this.handleMouseLeave
      }

    if(!this.hasMounted()) {
      return React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, assign(props, { key: index }));
      });
    }

    children.push(React.cloneElement(lastChild, assign(props, { key: -1 })));

    React.Children.forEach(this.props.children, (child, index) => {
      children.push(React.cloneElement(child, assign(props, { key: index })));
    });
    children.push(React.cloneElement(firstChild, assign(props, { key: this.props.children.length })));

    return children;
  }

  getChildrenCount() {
    var count = React.Children.count(this.props.children);

    return this.hasMounted() ? count + 2 : count;
  }

  getItemWidth() {
    let totalWidth = this.getTotalWidth();

    return 100 / this.getChildrenCount();
  }

  getItemWidthInPx() {
    return this.$el.children[0].offsetWidth;
  }

  getStyle() {
    let itemWidth = this.getItemWidth(),
        activePosition = 0;

    if(this.hasMounted()) {
      let itemWidth = this.getItemWidthInPx();
      activePosition = -(itemWidth * this.state.active); 

      if(this.state.dragged && this.touchStartPosition) {
        if(this.touchStartPosition > this.state.dragged) {
          let t = this.touchStartPosition - this.state.dragged
          activePosition = -(itemWidth * ( this.state.active ) + t);
        }
        else {
          let t = this.state.dragged - this.touchStartPosition;
          activePosition = -(itemWidth * ( this.state.active) - t);
        }
      }
    }

    return {
      width: this.getTotalWidth() + '%',
      transition: ( this.touched && this.state.dragged ) || this.resized ? 'none' : this.getTransitionSpeed(),
      transform: 'translate3d(' + activePosition + 'px, 0, 0)',
      WebkitTransform: 'translate3d(' + activePosition + 'px, 0, 0)',
      MozTransform: 'translate3d(' + activePosition + 'px, 0, 0)'
    };
  }

  getTransitionSpeed() {
    return this.props.transitionSpeed / 1000 + 's';
  }

  getCloneSlideTimeout() {
    return this.props.transitionSpeed + 100;
  }

  getTotalWidth() {
    return this.getChildrenCount() * 100;
  }

  goToSlide(number) {
    let total = this.getChildrenCount(),
        active;

    this.stopAnimationLoop();
    active = number;

    if(this.__timeout) {
      clearTimeout(this.__timeout);
    }

    this.setState({ active: active, isAnimating: true });

    if(this.hasMounted()) {
      this.__timeout = setTimeout(() => {
        this.stopAnimationLoop();
        if(this.state.active === total-1) {
          active = 1;
          this.resized = true;
          this.setState({ active: active, isAnimating: false });
        }
        else if(this.state.active === 0) {
          active = this.props.children.length;
          this.resized = true;
          this.setState({ active: active, isAnimating: false });
        }
        else {
          this.setState({ isAnimating: false });
        }
      }, this.getCloneSlideTimeout())
    }
  }

  isFirstSlide() {
    return this.state.active === 1;
  }

  isLastSlide() {
    return this.state.active === this.props.children.length;
  }

  navigateForward() {
    if(this.state.isAnimating) { return; }

    if(this.isLastSlide()) {
      this.goToSlide(this.getChildrenCount() - 1)
    }
    else {
      this.goToSlide(this.state.active + 1);
    }
  }

  navigateBackward() {
    if(this.state.isAnimating) { return; }

    if(this.isFirstSlide()) {
      this.goToSlide(0)
    }
    else {
      this.goToSlide(this.state.active - 1);
    }
  }

  startAnimationLoop() {
    if(!this.props.autoplay) { return; }

    this.timer = setInterval(this.navigateForward, this.props.autoplaySpeed);
  }

  stopAnimationLoop() {
    if(this.timer && this.props.autoplay) {
      this.stopAnimation = true;
      clearInterval(this.timer);

      if(this.__timeout) { clearTimeout(this.__timeout); }
    }
  }

  updateDimensions() {
    this.resized = true;
    this.setState({ wrapperWidth: this.$el.offsetWidth });
  }

  startResizeWatcher() {
    window.addEventListener('resize', this.updateDimensions)
  }

  stopResizeWatcher() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  handleTouchStart(e) {
    if(this.state.isAnimating) { return; }

    this.stopAnimationLoop();
    if(e.touches.length > 1) {
      e.preventDefault();
      this.setState({ dragged: false });
      return;
    }
    this.touched = true;
    this.touchStartPosition = e.touches[0].clientX;
    if(this.state.dragged) { this.setState({ dragged: false }) }
  }

  handleTouchCancel(e) {
    this.touched = false;
    this.touchStartPosition = null;
    this.stopAnimationLoop();
    this.setState({ dragged: false })
  }

  handleTouchStop(e) {
    var dragged = this.state.dragged;
    if(this.touched && dragged) {
      if(this.touchStartPosition > dragged) {
        this.navigateForward();
      }
      else {
        this.navigateBackward()
      }

      this.setState({ dragged: false })
    }

    this.touched = false;
    this.touchStartPosition = null;
  }

  handleTouchMove(e) {
    if(e.touches.length > 1) { e.preventDefault(); this.setState({ dragged: false }); return; }
    let obj = e.touches[0];
    this.setState({ dragged: obj.clientX })
  }

  componentDidMount() {
    this.$el = this.refs['slider-wrapper'];
    this.resized = true;
    this.setState({ active: 1 });
    this.startAnimationLoop();
    this.startResizeWatcher()
  }

  componentDidUpdate() {
    this.resized = false;
    if(this.stopAnimation) {
      this.stopAnimation = false;
      if(this.touched) { return; }
      this.startAnimationLoop();
    }
  }

  componentWillMount() {
    this.setState({ active: this.props.active })
  }

  componentWillUnmount() {
    this.stopResizeWatcher();
  }

  render() {
    return (
      <div>
        <div className='slider-wrapper'
            ref='slider-wrapper'
            style={ this.getStyle() }
            onTouchStart={ this.handleTouchStart }
            onTouchMove={ this.handleTouchMove }
            onTouchCancel={ this.handleTouchCancel }
            onTouchEnd={ this.handleTouchStop }>
          { this.renderSlides() }
        </div>

        { this.renderControls() }
        { this.renderDots() }
      </div>
    );
  }
}

// Default Props
Slider.defaultProps = {
  autoplay: false,
  autoplaySpeed: 3000,
  puaseOnHover: false,
  transitionSpeed: 300
};

// Props Validation
Slider.propTypes = {
  autoplay: PropTypes.bool,
  autoplayTime: PropTypes.number,
  pauseOnHover: PropTypes.bool
};
