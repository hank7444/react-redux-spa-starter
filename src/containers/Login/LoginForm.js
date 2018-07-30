import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import validation from './validation';
import { sendGALog } from 'ga';
import withI18N from 'shared/intl/withI18N';

import FormGroup from 'components/FormGroup/FormGroup';
import FormInputText from 'components/FormInputText/FormInputText';
import TouchScrollTip from 'components/TouchScrollTip/TouchScrollTip';

@reduxForm({
  form: 'login',
  validate: validation,
  initialValues: {
    account: '',
    password: '',
  },
})
@withI18N
export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    errMsg: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.ALERT_ERR_ARY = ['INVALID_ACCOUNT', 'INVALID_PASSWORD', 'INVALID_PARAM'];
    this.state = {
      showInvalidAccountPwErr: false,
    };

    this._handleLinkOnClick = this._handleLinkOnClick.bind(this);

    this.getAccountInput = this.getAccountInput.bind(this);
    this.getPasswordInput = this.getPasswordInput.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { ALERT_ERR_ARY } = this;
    const { errMsg } = this.props;
    const { errMsg: nextErrMsg } = nextProps;

    if (!errMsg && nextErrMsg) {

      if (ALERT_ERR_ARY.indexOf(nextErrMsg) !== -1) {
        this.setState({
          showInvalidAccountPwErr: true,
        });
        this.props.change('password', '');
      }
    }
  }

  _handleLinkOnClick(e) {
    const type = e.currentTarget.getAttribute('data-type');

    sendGALog('Login', 'click', type);
  }

  onInputFocus() {
    if (this.state.showInvalidAccountPwErr) {
      this.setState({
        showInvalidAccountPwErr: false,
      });
    }
  }

  getAccountInput(account) {
    const { i18n } = this.props;

    return (
      <FormGroup
        touched={account.meta.touched}
        error={account.meta.error}
        pristine={account.meta.pristine}
      >
        <label htmlFor="account" className="form-input-label">{i18n('common.label.account')}</label>

        <FormInputText
          type="email"
          id="account"
          name="account"
          value={account.input.value}
          onChange={account.input.onChange}
          onBlur={account.input.onBlur}
          onFocus={() => {
            this.onInputFocus();
          }}
        />
      </FormGroup>
    );
  }

  getPasswordInput(password) {
    const { i18n } = this.props;

    const passwordErr = this.state.showInvalidAccountPwErr ? '' : password.meta.error; // 有顯示 alert 就不顯示 password validation 錯誤
    return (
      <FormGroup
        touched={password.meta.touched}
        error={passwordErr}
        pristine={password.meta.pristine}
      >
        <label htmlFor="password" className="form-input-label">{i18n('common.label.pwd')}</label>
        <FormInputText
          type="password"
          id="password"
          name="password"
          value={password.input.value}
          onChange={password.input.onChange}
          onBlur={password.input.onBlur}
          onFocus={() => {
            this.onInputFocus();
          }}
        />
      </FormGroup>
    );
  }

  render() {
    const {
      i18n,
      handleSubmit,
      invalid,
      isSubmitting,
    } = this.props;
    const { showInvalidAccountPwErr } = this.state;

    const btnSubmitLabel = isSubmitting ? i18n('common.btn.logining') : i18n('common.btn.login');

    return (
      <form className="form flex-content" onSubmit={handleSubmit}>
        <TouchScrollTip containerClassName="flex-content-fill flex-content-with-iscroll account-page-content">
          <Field name="account" component={this.getAccountInput} />
          <Field name="password" component={this.getPasswordInput} />

          {showInvalidAccountPwErr &&
            <div className="alert alert-danger">
              <span className="alert-text">
                <i className="icon icon-alert"></i>{i18n('auth.alert.invalidAccountOrPassword')}
              </span>
            </div>
          }

        </TouchScrollTip>
        <div className="account-page-footer">
          <div className="btns-block">
            <button className="btn-primary" disabled={invalid || isSubmitting}>
              {btnSubmitLabel}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
