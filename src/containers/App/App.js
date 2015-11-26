import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
//import { bindActionCreators } from 'redux';

import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import * as einfoActions from 'redux/modules/einfo';

import { Context, CounterButton } from 'components';


/*
這邊將react與redux進行連接的動作，
state => 為redux store的屬性,
第二個物件"{loadInf, ...}", 要使用的action,

必須要在connect內設定完成才可以在Component內透過this.props來呼叫使用


state的命名也可以任意更換, 所以einfoNewName被改成einfo,
在this.props就可用einfo來取得


ECMA5 寫法

@connect(
  function(state, ownProps) {
    return {
      info: state.info,
      einfo: state.einfoNewName
    };
  },
  function(dispatch) {
    return bindActionCreators({
      loadInfo: loadInfo,
    }, dispatch);
  }
)
*/

@connect(
  state => ({
    info: state.info,
    einfo: state.einfoNewName
  }),
  {loadInfo, ...einfoActions}
)

export default class App extends Component {

  static propTypes = {
    children: PropTypes.any,
    info: PropTypes.object,
    loadInfo: PropTypes.func.isRequired,
    loadEinfo: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };


  // 這個要定義，才能在getChildContext() 設定要往child component傳的物件
  static childContextTypes = {
    param: PropTypes.string
  };


  // 設定要透過context往child component傳的參數
  getChildContext() {
    return {
      param: 'test'
    };
  }


  componentDidMount() {

    this.props.loadInfo();

  }

  triggerLoadInfo = () => {
    this.props.loadInfo();
    //this.props.loadEinfo();
  }

  render() {
    const styles = require('./App.scss');

    {/* 可以觀察到，當triggerLoadInfo一呼叫，讓redux store改變後，react會重新rerender畫面 */}

    console.log('this.props', this.props);

    {/*
      this.context是很妙的屬性，可以讓child component拿到parent component設定的值而不需
      將值傳入child component中
    */}

    console.log('this.context', this.context);

    const {info} = this.props;

    return (
      <div className={styles.app}>

        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <Link to="/" className="navbar-brand">
                brand
              </Link>

              <ul className="nav navbar-nav">
                <li><Link to="about">About</Link></li>
                <li><Link to="chart">Chart</Link></li>
              </ul>
            </div>
        </nav>

        <div className={styles.appContent}>

          <Context/>

          <CounterButton/>


          <br/>

          <a onClick={this.triggerLoadInfo}>test API</a>


          {/* 在render裏面，註解必須這樣寫 */}
          {/*
            多行也ok,
            ooooxxxx
          */}

          {/*
            在react架構下，所有DOM的變化都是由state控制，如果不小心render不存在的states or props,
            react就直接爆給你看, 所以一般來說都會有loading, loaded這兩種狀態, 確定store有資料才做render的動作
          */}
          <h3>info:
            {info.loading &&
              'loading...'
            }
            {info.loaded &&
              <span>
              {info.data.message} data: {info.data.time}
              </span>
            }
          </h3>

          {this.props.children}
        </div>
      </div>
    );
  }
}
