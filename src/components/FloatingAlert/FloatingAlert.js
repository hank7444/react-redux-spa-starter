import React, { Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

const ICONS_HASH = {
  fail: 'icon-icon-fail-ol',
  success: 'icon-icon-success-ol',
};

export default class FloatingAlert extends Component {
  constructor(props) {
    super(props);

    this.defaultOption = {
      duration: 3,
      type: 'success', // success, fail
      msg: '',
    };

    this.state = {
      options: this.defaultOption,
      isShow: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  show(options) {
    const _options = Object.assign({}, this.defaultOption, options);

    this.setState({
      options: _options,
      isShow: true,
    });

    this._handleEnterBegin();

    return this;
  }

  hide() {
    this.setState({
      isShow: false,
    });
  }

  _handleEnterBegin() {
    let {
      options: {
        duration,
      },
    } = this.state;

    duration = duration ? duration * 1000 : 3000;

    setTimeout(() => {
      this.setState({
        isShow: false,
      });
    }, duration);
  }

  render() {
    const {
      options: {
        type,
      msg,
      },
      isShow,
    } = this.state;

    return (
      isShow &&
      <div className="floating-alert">
        <div className={`floating-alert-content ${type}`}>
          <div className="icon-shape">
            <i className={ICONS_HASH[type]} />
          </div>
          <div>
            <span>{msg}</span>
          </div>
        </div>
      </div>
    );
  }
}
