import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from 'redux/modules/auth';

import withI18N from 'shared/intl/withI18N';

@connect(
  state => ({
    loginSuc: state.auth.get('loginSuc'),
    getInfoSuc: state.auth.get('getInfoSuc'),
    info: state.auth.get('info'),
  }), {
    logout,
  },
)

@withI18N
class Home extends Component {

  static propTypes = {
    loginSuc: PropTypes.bool.isRequired,
    getInfoSuc: PropTypes.bool.isRequired,
    info: ImmutablePropTypes.map.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static contextTypes = {
    globalFromApp: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {

  }

  handleBtnLogoutOnClick = () => {
    this.props.logout();
  }

  render() {
    const { loginSuc, getInfoSuc, info } = this.props;

    return (
      <div className="page-home">
        this is home!!

        {loginSuc &&
          <button type="button" onClick={this.handleBtnLogoutOnClick}>logout</button>
        }
        {!loginSuc &&
          <Link to="/login">login</Link>
        }

        {getInfoSuc &&
          <div>
            <p>mid: {info.get('mid')}</p>
            <p>name: {info.get('name')}</p>
            <p>age: {info.get('age')}</p>
          </div>
        }
      </div>
    );
  }
}

module.exports = Home;
