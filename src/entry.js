import React, { Component } from 'react';
import { render } from 'react-dom';
import Slider from './slider';
import Slide from './slide';

class Example extends Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      active: 0
    };
  }

  handleChange(active) {
    console.log(active)
  }

  handleNext() {
  }

  handlePrevious() {
  }

  getNextIcon() {
    return <button>Next</button>
  }

  getPrevIcon() {
    return <button>Previous</button>
  }

  render() {
    return (
      <div>
        <Slider autoplay={ true }
                pauseOnHover={ true }
                goTo={ this.state.active }
                nextIcon={ this.getNextIcon() }
                prevIcon={ this.getPrevIcon() }>
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
      </div>
    );
  }
}

render(<Example />, document.getElementById('root'));
