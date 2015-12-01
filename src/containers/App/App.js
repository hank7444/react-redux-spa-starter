import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Link } from 'react-router';
//import { bindActionCreators } from 'redux';

import { isLoaded as isInfoLoaded, load as loadInfo, loadAll, loadRace, loadWaterfall } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import * as einfoActions from 'redux/modules/einfo';

import {InfoBar, Context, CounterButton, DumbTest, TickTock, JqueryFadeIn, JqueryDraggable} from 'components';

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


不使用connect decoroter寫法

class App extends Component {
  ...
}

// 放到最下面

// 綁定屬性
function mapStateToProps(state, ownProps) {

  //console.log('ownProps', ownProps);
  return {
    errorMessage: state.errorMessage
  };
}

// 綁定action
function dispatchStateToProps(dispatch) {

  console.log(dispatch);
  //const resetErrorMessage = bindActionCreators(resetErrorMessage, dispatch);
  return {
      resetErrorMessage: bindActionCreators(resetErrorMessage, dispatch)
  }
}

// connext([mapStateToProps], [mapDispatchToProps], [mergeProps])
export default connect(
  mapStateToProps,
  //dispatchStateToProps
  {resetErrorMessage}
)(App);

*/

@connect(
  state => ({
    user: state.auth.user,
    info: state.info,
    einfo: state.einfoNewName,
    router: state.router,
    counter: state.counter
  }),
  {loadInfo, loadAll, loadRace, loadWaterfall, ...einfoActions, logout, pushState}
)

export default class App extends Component {

  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.any,
    info: PropTypes.object,
    loadInfo: PropTypes.func.isRequired,
    loadEinfo: PropTypes.func.isRequired,
    loadAll: PropTypes.func.isRequired,
    loadRace: PropTypes.func.isRequired,
    loadWaterfall: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    logout: PropTypes.func,
    router: PropTypes.object,
    counter: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };


  // 這個要定義，才能在getChildContext() 設定要往child component傳的物件
  static childContextTypes = {
    param: PropTypes.string
  };


  constructor() {
    super();
    this.state = {
      val: 0,
      isLoading: false
    };
  }

  // 設定要透過context往child component傳的參數
  getChildContext() {
    return {
      param: 'test'
    };
  }


  componentDidMount() {

    //this.props.loadInfo();
    //this.props.loadAll();
    //this.props.loadRace();
    this.props.loadWaterfall();

    console.log('this.refs', this.refs);

    //this.refs.loader.fadeIn();



    /*
    this.setState({val: this.state.val + 1}); 0
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1}); 0
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1}); 2
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1}); 3
      console.log(this.state.val);  // 第 4 次 log
    }, 0);

    */

  }


  // 透過redux state redirect route的工作，請在這裡進行
  componentWillReceiveProps(nextProps) {

    const router = this.props.router;
    const history = this.props.history;
    const nextRouter = nextProps.router;

    // 這邊測試route轉換前(從/login跳出時)先確認，但是url改變了....
    /*
    if (router.location.pathname === '/login' && nextRouter.location.pathname !== '/login') {
      console.log('######################');
      if (!window.confirm('確認要離開登入頁?')) {
        history.replaceState(null, '/login');
      }
    }
    */
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/about');
    }

  }


  // 如果return false則畫面不作任何改變, 也不會導頁!
  shouldComponentUpdate(nextProps, nextState) {
    const router = this.props.router;
    const nextRouter = nextProps.router;



    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("> componentWillUpdate(nextProps, nextState)");

  }

  fadeIn() {
    this.setState({
      isLoading: true
    });
  }

  fadeOut() {
    this.setState({
      isLoading: false
    });
  }


  triggerLoadInfo() {
    this.props.loadInfo();
    //this.props.loadEinfo();
  }

  handleLogout(param, event) {
    console.log('param ', param);
    console.log('event ', event);
    //event.preventDefault();
    this.props.logout();
  }

  render() {

    const styles = require('./App.scss');
    const css = require('./appTest.css');

    console.log('@@@@@@@@@@@@###### ', this.state);

    /*
    console.log('reder App', styles);
    console.log('css ', css);
    console.log('css.appTest', css['app-test']);
    */

    /*
    const staticStyles = require('style/css/bundle.css');
    const testCssStyles = require('style/css/test.css');

    console.log('staticStyles', staticStyles);
    console.log('testCssStyles', testCssStyles);
    console.log('testStyles', testStyles);
    */


    // 可以觀察到，當triggerLoadInfo一呼叫，讓redux store改變後，react會重新rerender畫面

    //console.log('this.props', this.props);

    /*
      this.context是很妙的屬性，可以讓child component拿到parent component設定的值而不需
      將值傳入child component中
    */

    //console.log('this.context', this.context);

    const {info, user, counter} = this.props;

    return (
      <div className={styles.app}>

        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <Link to="/" className="navbar-brand">
                brand
              </Link>

              <ul className="nav navbar-nav">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/chart">Chart</Link></li>
                {!user && <li><Link to="/login">Login</Link></li>}
                {user && <li><a href="#" onClick={this.handleLogout.bind(this, 'aaa')}>logout</a></li>}
              </ul>
            </div>
        </nav>

        <div className={styles['app-content']}>

          <div className={styles.section4}>
            counter: {counter.count}
          </div>

          <a onClick={this.fadeIn.bind(this)}>fadeIn</a>
          <a onClick={this.fadeOut.bind(this)}>fadeOut</a>



          <JqueryFadeIn ref="loader" isLoading={this.state.isLoading}/>

          <JqueryDraggable/>

          <Context/>

          <CounterButton/>

          <DumbTest/>

          <InfoBar/>

          <i className="icon-fb"></i>

          <div className="bg-action2">
            <h1>test retina bg</h1>
          </div>

          {/*
          <i className={staticStyles.iconFb}></i>
          */}

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
