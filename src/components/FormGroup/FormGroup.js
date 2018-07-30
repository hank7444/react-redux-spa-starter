import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import withI18N from 'shared/intl/withI18N';

@withI18N
export default class FormGroup extends Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    touched: PropTypes.bool,
    pristine: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    className: '',
    touched: false,
    pristine: true,
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    const { i18n, children, className, touched, pristine, error } = this.props;
    const hasErrorClass = (touched || !pristine) && error ? 'tip-err' : '';
    const isShowErr = !!error && typeof error !== 'boolean';
    const errorMsg = isShowErr && (i18n(error) || error);

    return (
      <div className={`form-group ${className} ${hasErrorClass}`}>
        {children}
        {hasErrorClass && isShowErr && <span className="text-tip">{errorMsg}</span>}
      </div>
    );
  }
}
