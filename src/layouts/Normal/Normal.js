import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Header, Footer} from 'components';

/*
@connect(
  state => ({}),
  {loadWaterfall}
)
*/

class Normal extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  render() {

    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default Normal;
