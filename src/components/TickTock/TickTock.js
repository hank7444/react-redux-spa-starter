import React, {Component, PropTypes} from 'react';
//import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import setIntervalMixin from 'mixins/setInterval';
import reactMixin from 'react-mixin';

@connect(
  state => ({count: state.counter.count})
  //{increment}
)

@reactMixin.decorate(setIntervalMixin)

export default class TickTock extends Component {

  static propTypes = {
    count: PropTypes.number
    //increment: PropTypes.func.isRequired
    //className: PropTypes.string
  }

  constructor(props, context) {
    super(props, context); // 這邊要設定, 在contstructor裡面才拿的到this.props, 跟this.context
    this.state = {
      seconds: 0
    };

    console.log('[TickTock] this in constructor', this);

    // 這邊要綁定，tick()才拿到的this.state, this.context, this.props
    this.tick = this.tick.bind(this);
  }


  componentDidMount() {

    console.log(this);
    //this.setInterval(this.tick, 1000); // 调用 mixin 的方法
  }

  tick() {
    console.log(this);
    this.setState({seconds: this.state.seconds + 1});
  }


  render() {
    console.log('this.state', this.state);

    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
}
