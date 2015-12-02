import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {increment} from 'redux/modules/counter';


export default class TextInput extends Component {

  handleCheckPhoneNumber() {
    console.log('handleCheckPhoneNumber is running.');
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
