import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {increment} from 'redux/modules/counter';


export default class TextInput extends Component {

  handleCheckPhoneNumber(num) {
    console.log('handleCheckPhoneNumber is running.');

    this.setState({
      counter: num * 5
    }, function() {
      console.log('@@@@@@#####BBBBB');
    });
  }

  render() {
    return (
        <input
            type="text"
            className="textInput"
            onBlur={this.handleCheckPhoneNumber.bind(this)} />
    );
  }
}
