import React, { Component } from 'react';
import { render } from 'react-dom';
import Slider from './slider';
import Slide from './slide';
import Navigator from './navigator';

class Example extends Component {
  constructor(props) {
    super(props);
  }

  getNextIcon() {
    return <span className='next' />
  }

  getPrevIcon() {
    return <span className='previous' />
  }

  getNavigator() {
    return (
      <Navigator className='slider-navigator'>
        <li>
          <h6>Hello</h6>
          <p>Description</p>
        </li>
        <li>Slide 2</li>
        <li>Slide 3</li>
        <li>Slide 4</li>
      </Navigator>
    );
  }

  render() {
    return (
      <div>
        <Slider autoplay={ true }
                pauseOnHover={ true }
                nextIcon={ this.getNextIcon() }
                prevIcon={ this.getPrevIcon() }
                navigator={ this.getNavigator() }>
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
