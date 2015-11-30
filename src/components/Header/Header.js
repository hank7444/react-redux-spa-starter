import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

export default class Header extends Component {

  render() {

    const style = {
      backgroundColor: 'navy'
    }

    return (
      <div style={style}>
        <h1>This is header</h1>
      </div>
    );
  }
}
