import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

export default class Footer extends Component {

  render() {

    const style = {
      backgroundColor: 'red'
    };

    return (
      <div style={style}>
        <h1>This is footer</h1>
      </div>
    );
  }
}
