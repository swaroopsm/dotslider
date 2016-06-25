import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Slider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };

    this.navigateForward = this.navigateForward.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.startAnimationLoop = this.startAnimationLoop.bind(this);
    this.stopAnimationLoop = this.stopAnimationLoop.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchStop = this.handleTouchStop.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);
  }

  renderSlides() {
    let itemWidth = this.getItemWidth();

    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        width: itemWidth
      });
    });
    return this.props.children;
  }

  getItemWidth() {
    let totalWidth = this.getTotalWidth();

    return 100 / React.Children.count(this.props.children);
  }

  getItemWidthInPx() {
    return this.$el.offsetWidth / React.Children.count(this.props.children);
  }

  getStyle() {
    let itemWidth = this.getItemWidth(),
        activePosition = 0;

    if(this.$el) {
      let itemWidth = this.getItemWidthInPx();
      activePosition = -(itemWidth * this.state.active); 
      if(this.state.dragged && this.touchStartPosition) {
        console.log(this.touchStartPosition + ':' + this.state.dragged)
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
      transition: ( this.touched && this.state.dragged ) || this.resized ? '0s' : '0.6s',
      transform: 'translate3d(' + activePosition + 'px, 0px, 0px)'
    };
  }

  getTotalWidth() {
    return React.Children.count(this.props.children) * 100;
  }

  navigateForward() {
    let total = React.Children.count(this.props.children),
        active;

    active = this.state.active === total - 1 ? 0 : this.state.active + 1;
    this.setState({ active: active });
    this.props.onChange && this.props.onChange(active);
  }

  navigateBackward() {
    let total = React.Children.count(this.props.children),
        active;

    active = this.state.active === 0 ? total-1 : this.state.active - 1;
    this.setState({ active: active });
    this.props.onChange && this.props.onChange(active);
  }

  startAnimationLoop() {
    console.log('Starting....')
    this.timer = setInterval(this.navigateForward, 3000);
  }

  stopAnimationLoop() {
    if(this.timer) {
      this.stopAnimation = true;
      clearInterval(this.timer);
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
    this.stopAnimationLoop();
    if(e.touches.length > 1) {
      e.preventDefault();
      this.setState({ dragged: false });
      return;
    }
    this.touched = true;
    this.touchStartPosition = e.touches[0].clientX;
    if(this.state.dragged) { this.setState({ dragged: false }) }
    // this.stopAnimationLoop();
  }

  handleTouchCancel(e) {
    this.touched = false;
    this.touchStartPosition = null;
    this.setState({ dragged: false })
    this.stopAnimationLoop();
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
    this.stopAnimationLoop();
    if(e.touches.length > 1) { e.preventDefault(); this.setState({ dragged: false }); return; }
    let obj = e.touches[0];
    this.setState({ dragged: obj.clientX })
  }

  componentDidMount() {
    this.$el = this.refs['slider-wrapper'];
    this.startAnimationLoop();
    this.startResizeWatcher()
  }

  componentDidUpdate() {
    this.resized = false;
    if(this.stopAnimation) {
      this.stopAnimation = false;
      // if(this.touched) { return; }
      this.startAnimationLoop();
    }
  }

  componentWillMount() {
    this.setState({ active: this.props.active })
  }

  componentWillUnmount() {
    this.stopResizeWatcher();
  }

  componentWillReceiveProps(nextProps) {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState({ active: nextProps.active });
      this.startAnimationLoop();
    }
  }

  render() {
    return (
      <div className='slider-wrapper'
           ref='slider-wrapper'
           style={ this.getStyle() }
           onTouchStart={ this.handleTouchStart }
           onTouchMove={ this.handleTouchMove }
           onTouchCancel={ this.handleTouchCancel }
           onTouchEnd={ this.handleTouchStop }>
        { this.renderSlides() }
      </div>
    );
  }
}

// Default Props
Slider.defaultProps = {
  autoplay: false,
  autoplayTime: 2000,
};

// Props Validation
Slider.propTypes = {
  autoplay: PropTypes.bool,
  autoplayTime: PropTypes.number
};
