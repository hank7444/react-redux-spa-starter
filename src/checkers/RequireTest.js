import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default class RequireTest extends Component {

  componentWillMount() {

    console.log('go through RequireTest');


  }

  render() {
    return this.props.children;
  }
}
