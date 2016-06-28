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
            <img src="https://s32.postimg.org/ev0a04nlh/black_and_white_coffee_cup_mug.jpg" alt="" />
          </Slide>

          <Slide>
            <img src="https://s32.postimg.org/knawejynp/cars_traffic_night_street.jpg" alt="" />
          </Slide>

          <Slide>
            <img src="https://s31.postimg.org/ku5jrghvf/food_kitchen_cutting_board_cooking.jpg" alt="" />
          </Slide>

          <Slide>
            <img src="https://s31.postimg.org/vt1j4q73f/pexels_photo.jpg" alt="" />
          </Slide>
        </Slider>
      </div>
    );
  }
}

render(<Example />, document.getElementById('root'));
