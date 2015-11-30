import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {Header} from 'components';

/*
@connect(
  state => ({}),
  {loadWaterfall}
)
*/

class NoFooter extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  render() {

    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default NoFooter;
