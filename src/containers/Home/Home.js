import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {loadWaterfall} from 'redux/modules/info';
import {Normal as Layout} from 'layouts';
/*
@connect(
  state => ({}),
  {loadWaterfall}
)
*/

class Home extends Component {

  /*
  static propTypes = {
    loadWaterfall: PropTypes.func.isRequired
  };

  componentDidMount() {

    //this.props.loadInfo();
    //this.props.loadAll();
    //this.props.loadRace();
    this.props.loadWaterfall();

  }
  */

  render() {

    return (
      <Layout>
        <div>
          <h1>Home Hello World!</h1>
        </div>
      </Layout>
    );
  }
}

export default Home;
