import React, {Component, PropTypes} from 'react';
//import { connect } from 'react-redux';
//import {increment} from 'redux/modules/counter';

export default class DumbTest extends Component {

  constructor() {
    super();
    this.state = {
      val: 0
    };
  }


  /*
  The developers talk about ES6 class support in the Release Notes for v0.13.0.
  If you use an ES6 class that extends React.Component,
  then you should use a constructor() instead of getInitialState:
  */
  /*
  getInitialState() {
    return {liked: false};
  }
  */

  componentDidMount() {

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
    // Prevent usage of setState in componentDidMount (no-did-mount-set-state)
    /*
    this.setState({val: this.state.val + 1}); // 0
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1}); // 0
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1}); // 2
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1}); // 3
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
    */
  }

  render() {

    console.log('reder DombTest');

    return (
      <div>Dumb Test</div>
    );
  }
}

