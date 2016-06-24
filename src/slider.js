import React, { Component, PropTypes } from 'react';

export default class Slider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };

    this.navigateForward = this.navigateForward.bind(this);
  }

  handleNext() {

  }

  handlePrevious() {

  }

  renderSlides(dwtotalWidth) {
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

  getStyle() {
    let itemWidth = this.getItemWidth(),
        activePosition = 0;

    if(this.$el) {
      let itemWidth = this.$el.children[0].offsetWidth;
      activePosition = -(itemWidth * this.state.active); 
    }

    return {
      width: this.getTotalWidth() + '%',
      transition: '0.6s',
      transform: 'translate3d(' + activePosition + 'px, 0px, 0px)'
    };
  }

  getTotalWidth() {
    return React.Children.count(this.props.children) * 100;
  }

  navigateForward() {
    let total = React.Children.count(this.props.children);

    if(this.state.active === total - 1) {
      this.setState({ active: 0 });
    }
    else {
      this.setState({ active: this.state.active+ 1 });
    }
  }

  startAnimationLoop() {
    this.timer = setInterval(this.navigateForward, 3000);
  }

  stopAnimationLoop() {
    if(this.timer) {
      this.stopAnimation = true;
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    this.$el = this.refs['slider-wrapper'];
    this.startAnimationLoop();
  }

  componentDidUpdate() {
    if(this.stopAnimation) {
      this.stopAnimation = false;
      this.startAnimationLoop();
    }
  }

  componentWillMount() {
    this.setState({ active: this.props.active })
  }

  componentWillReceiveProps(nextProps) {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState({ active: nextProps.active });

      this.timer = setInterval(() => {
        this.setState({ active: this.state.active + 1 });
      }, 3000);
    }
  }

  render() {
    return (
      <div className='slider-wrapper' ref='slider-wrapper' style={ this.getStyle() }>
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
