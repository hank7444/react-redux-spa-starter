import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {loadWaterfall} from 'redux/modules/info';
import {Normal as Layout} from 'layouts';
import connectData from 'helpers/connectData';
/*
@connect(
  state => ({}),
  {loadWaterfall}
)
*/


// 測試Home fetchData, 只有進來這裡才會呼叫喔, 不過這邊就跟componentDidMount有一樣的效果啦
// 因為切換頁面每次home都會重新呼叫componentDidMount
function fetchDataDeffered(getState, dispatch) {
  const promises = [];

  /*
  if (!isInfoLoaded(getState())) {
    promises.push(dispatch(loadInfo()));
  }
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  */
  //promises.push(dispatch(loadAuth()));
  return Promise.all(promises.push(dispatch(loadWaterfall())));
}

// 每次route切換都會拿一次資料，如果寫在componentDidMount就只有reload才會呼叫(以App Component為例)
//@connectData(fetchDataDeffered, null)

@connect(
  state => ({}),
  {loadWaterfall}
)

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

  static propTypes = {
    loadWaterfall: PropTypes.func.isRequired
  };

  componentDidMount() {
    //this.props.loadWaterfall();
  }

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
