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
  }

  handleNext() {
    this.setState({ active: this.state.active + 1 });
  }

  handlePrevious() {

  }

  render() {
    return (
      <div>
        <Slider active={ this.state.active }>
          <Slide>
            <h1>1</h1>
          </Slide>

          <Slide>
            <h1>2</h1>
          </Slide>

          <Slide>
            <h1>3</h1>
          </Slide>

          <Slide>
            <h1>4</h1>
          </Slide>

          <Slide>
            <h1>5</h1>
          </Slide>
        </Slider>

        <button onClick={ this.handlePrevious }>Previous</button>
        <button onClick={ this.handleNext }>Next</button>
      </div>
    );
  }
}

render(<Example />, document.getElementById('root'));
