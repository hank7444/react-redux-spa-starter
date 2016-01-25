import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {increment} from 'redux/modules/counter';

@connect(
  state => ({count: state.counter.count}),
  {increment}
)


/*
測試prop或是state更新,
都不會從頭render耶...只會render用到的component,
喔喔超酷的，我在App Component也放了counter.count顯示,
React也會rerender App呢!
*/
export default class CounterButton extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  props = {
    className: ''
  };


  constructor() {
    super();
    this.state = {
      stateCount: 0
    };
  }

  handleClick() {
    this.props.increment();
    this.setState({
      stateCount: this.state.stateCount + 1
    });
  }


  render() {

    const {count, increment} = this.props; // eslint-disable-line no-shadow
    const {stateCount} = this.state;
    let {className} = this.props;
    className += ' btn btn-default';

    console.log('render CounterButton');

    return (
      <button className={className} onClick={this.handleClick.bind(this)}>
        You have clicked me {count} time{count <= 1 ? '' : 's'}.
        This is stateCount: {stateCount}
      </button>
    );
  }
}
