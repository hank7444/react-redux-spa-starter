import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import {
  getVersion,
  cleanDataByVersion,
} from 'redux/modules/app';

import withI18N from 'shared/intl/withI18N';

import FloatingAlert from 'components/FloatingAlert/FloatingAlert';
import TouchScrollTip from 'components/TouchScrollTip/TouchScrollTip';
import SnackBar from 'components/SnackBar/SnackBar';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';

@withRouter
@connect(
  (state) => {
    const app = state.app;
    return {
      loginSuc: state.auth.get('loginSuc'),
      logoutAlert: state.auth.get('logoutAlert'),
      version: app.get('version'),
      error: state.error.get('error'),
    };
  }, {
    getVersion,
    cleanDataByVersion,
  },
)
@withI18N
class App extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    error: PropTypes.oneOfType([
      ImmutablePropTypes.map,
      PropTypes.bool,
    ]).isRequired,
    loginSuc: PropTypes.bool.isRequired,
    logoutAlert: PropTypes.bool.isRequired,
    version: PropTypes.string.isRequired,
    getVersion: PropTypes.func.isRequired,
    cleanDataByVersion: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    globalFromApp: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    const { i18n } = this.props;

    this.COMMON_ERROR_HASH = {
      UNKNOWN: i18n({ id: 'common.snackbar.err' }, 'html'),
      DISCONNECTED: i18n({ id: 'common.snackbar.err.disconnected' }, 'html'),
      TIMEOUT: i18n({ id: 'common.snackbar.err.timeout' }, 'html'),
    };

    this.showConfirmDialog = this.showConfirmDialog.bind(this);
    this.hideConfirmDialog = this.hideConfirmDialog.bind(this);
    this.isConfirmDialogShow = this.isConfirmDialogShow.bind(this);
    this.addSnackbar = this.addSnackbar.bind(this);
    this.removeSnackbar = this.removeSnackbar.bind(this);
    this.showFloatingAlert = this.showFloatingAlert.bind(this);
    this.hideFloatingAlert = this.hideFloatingAlert.bind(this);

    this.globalFromApp = {
      showConfirmDialog: this.showConfirmDialog,
      hideConfirmDialog: this.hideConfirmDialog,
      isConfirmDialogShow: this.isConfirmDialogShow,
      addSnackbar: this.addSnackbar,
      removeSnackbar: this.removeSnackbar,
      showFloatingAlert: this.showFloatingAlert,
      hideFloatingAlert: this.hideFloatingAlert,
    };
  }

  getChildContext() {
    return {
      globalFromApp: this.globalFromApp,
    };
  }

  componentDidMount() {
    TouchScrollTip.touchmoveControllerInit();

    // init data from api
    this.props.getVersion();
  }

  componentWillReceiveProps(nextProps) {
    const { COMMON_ERROR_HASH } = this;
    const { version, loginSuc, logoutAlert, error } = this.props;
    const {
      version: nextVersion,
      logoutAlert: nextLogoutAlert,
      error: nextError,
    } = nextProps;

    if (version !== nextVersion) {
      this.props.cleanDataByVersion();
    }

    if (!logoutAlert && nextLogoutAlert) {
      this.showConfirmDialog({
        title: i18n('common.popup.oops.title'),
        msg: i18n('app.popup.sessionTimeout.desc'),
        hasHeaderClose: false,
      });
    }

    if (error != nextError && nextError) { // catch unexpection error
      const errType = nextError.getIn(['err', 'msg']);
      const errMsg = COMMON_ERROR_HASH[errType] || COMMON_ERROR_HASH['UNKNOWN'];
      const snackbarType = errType === 'DISCONNECTED' ? 'disconnected' : 'fail';

      this.addSnackbar({
        text: errMsg,
        type: snackbarType,
      });
    }
  }

  componentDidCatch(error) {

  }

  showFloatingAlert(options) {
    return this.floatingAlert.show(options);
  }

  hideFloatingAlert() {
    this.floatingAlert.hide();
  }

  showConfirmDialog(options) {
    return this.dialogConfirm.show(options);
  }

  hideConfirmDialog() {
    return this.dialogConfirm.hide();
  }

  isConfirmDialogShow() {
    return this.dialogConfirm.isShow();
  }

  addSnackbar(data) {
    return this.snackbar.addMsg(data);
  }

  removeSnackbar(uid) {
    return this.snackbar.removeMsg(uid);
  }

  render() {
    const { i18n } = this.props;

    return (
      <div id="app">
        <div className="wrap-border-radius">
          <SnackBar ref={ref => { this.snackbar = ref; }} />
          <div className="screen-panel">
            <DialogConfirm wrappedComponentRef={ref => { this.dialogConfirm = ref; }} />
            <FloatingAlert ref={ref => { this.floatingAlert = ref; }} />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
