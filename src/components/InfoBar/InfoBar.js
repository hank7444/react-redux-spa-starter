import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

import { TextInput } from 'components';
import enhance from '../enhance/enhance';

@connect(
    state => ({info: state.info.data}),
    dispatch => bindActionCreators({load}, dispatch))
@enhance('myData from outside!!')
export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.debug('InfoBar props', this.props);

  }
  componentWillUpdate(nextProps, nextState) {
    console.debug('nextProps', nextProps);
    console.debug('InfoBar will update');
  }

  render() {

    console.debug('this.props', this.props);

    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    const stylesFromCss = require('./InfoBar.css'); // css當變數竟然是空的..

    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          <i className={styles.iconFb}></i>
          <h1 className={stylesFromCss.myLove}>test</h1>
          <TextInput/>
          This is an info bar
          {' '}
          <strong>{info ? info.message : 'no info!'}</strong>
          <span className={styles.time}>{info && new Date(info.time).toString()}</span>
          <button className="btn btn-primary" onClick={load}>Reload from server</button>
        </div>
      </div>
    );
  }
}
