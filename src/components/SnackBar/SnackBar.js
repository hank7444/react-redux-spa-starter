import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { CSSTransition } from 'react-transition-group';
import uniqueId from 'lodash/uniqueId';

import EllipsisText from 'components/EllipsisText/EllipsisText';

export default class Snackbar extends Component {
  static propTypes = {
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      msgShow: null,
      isMultiline: true,
    };

    this.ALLOW_TYPES = ['fail', 'success', 'custom', 'disconnected'];
    this.msgs = [];
    this.isShow = false;
    this.beginTimeoutId = null;
    this.leaveTimeoutId = null;

    this._handleOnEnter = this._handleOnEnter.bind(this);
    this._handleOnEntered = this._handleOnEntered.bind(this);
    this._handleOnExited = this._handleOnExited.bind(this);
    this._handleTruncate = this._handleTruncate.bind(this);
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillUnmount() {
    clearTimeout(this.beginTimeoutId);
    clearTimeout(this.leaveTimeoutId);
  }

  addMsg(data) {
    const { msgs, isShow } = this;

    if (data && (msgs.length || isShow)) {
      data.uid = uniqueId('snackbar_');
      this.msgs.push(data);
      return data.uid;
    } else if (data && !msgs.length) {
      data.uid = uniqueId('snackbar_');
      this._showMsg(data);
      return data.uid;
    } else if ((!data && msgs.length)) {
      const msg = msgs.shift();
      this._showMsg(msg);
    }
  }

  removeMsg(uid) {
    const { msgs } = this;
    const { msgShow } = this.state;

    if (msgShow && uid === msgShow.uid) {
      this.isShow = false;
      this.setState({
        msgShow: null,
      }, () => {
        this.addMsg();
      });
    } else {
      this.msgs = msgs.filter(msg => uid !== msg.uid);
    }
  }

  _showMsg(data) {
    this.setState({
      msgShow: data,
    });
  }

  _handleOnEnter() {
    this.isShow = true;
  }

  _handleOnEntered() {
    const { msgShow } = this.state;
    let duration = msgShow && msgShow.duration;

    if (duration === 0) {
      return false;
    }

    duration = duration ? duration * 1000 : 3000;

    this.enterTimeoutId = setTimeout(() => {
      this.setState({
        msgShow: null,
      });
    }, duration);
  }

  _handleOnExited() {
    this.leaveTimeoutId = setTimeout(() => {
      // set default CSS to support multiple-line
      this.setState({
        isMultiline: true,
      });
      this.isShow = false;
      this.addMsg();
    }, 100);
  }

  _handleTruncate(truncated, lines) {
    const isMultiline = lines > 1;

    if (isMultiline !== this.state.isMultiline) {
      this.setState({
        isMultiline,
      });
    }
  }

  render() {
    const { ALLOW_TYPES } = this;
    const { style } = this.props;
    const { msgShow, isMultiline } = this.state;

    const type = msgShow && ALLOW_TYPES.indexOf(msgShow.type) !== -1 ? msgShow.type : ALLOW_TYPES[0];
    const text = msgShow ? msgShow.text : '';
    const lines = msgShow && msgShow.lines ? msgShow.lines : 2;
    const customChild = msgShow && msgShow.type === 'custom' ? msgShow.customChild : null;

    return (
      <div className="snackbar-wrap">
        <CSSTransition
          in={!!msgShow}
          classNames="snackbar"
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={this._handleOnEnter}
          onEntered={this._handleOnEntered}
          onExited={this._handleOnExited}
        >
          <div className={`snackbar snackbar-${type}`} style={style}>
            <div className={`snackbar-content ${isMultiline ? '' : 'single-line-content'}`}>
              <div className="text">
                <EllipsisText lines={lines} ellipsis="..." onTruncate={this._handleTruncate}>
                  {text}
                </EllipsisText>
              </div>
              {customChild}
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
