import React, { Component } from 'react';
import { render } from 'react-dom';
import Slider from './slider';
import Slide from './slide';

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(active) {
    this.activeSlide = active;
  }

  handleNext() {
    var active = this.activeSlide ? this.activeSlide === 4 ? -1 : this.activeSlide : 0;
    this.activeSlide = active + 1;

    this.setState({ active: this.activeSlide });
  }

  handlePrevious() {
    var active = this.activeSlide ? this.activeSlide === 0 ? 5 : this.activeSlide : 5;
    this.activeSlide = active - 1;

    this.setState({ active: this.activeSlide });
  }

  render() {
    return (
      <div>
        <Slider active={ this.state.active }
                onChange={ this.handleChange }>
          <Slide>
            <img src="https://img3.gozefo.com/website/sofab_d.jpg" alt="" />
          </Slide>

          <Slide>
            <img src="https://img3.gozefo.com/website/tv/tvb_d1.jpg" alt="" />
          </Slide>

          <Slide>
            <img src="https://img3.gozefo.com/website/newhomepage/sell-d.jpg" alt="" />
          </Slide>

          <Slide>
            <img src="https://img3.gozefo.com/website/HIW_nd.jpg" alt="" />
          </Slide>
        </Slider>

        <div>
          <button onClick={ this.handlePrevious }>Previous</button>
          <button onClick={ this.handleNext }>Next</button>
        </div>
      </div>
    );
  }
}

render(<Example />, document.getElementById('root'));
