import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { Link } from 'react-router';


@connect(
  state => ({}),
  {loadInfo}
)

export default class App extends Component {

  static propTypes = {
    children: PropTypes.any,
    loadInfo: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  triggerLoadInfo = () => {
    this.props.loadInfo();
  }

  render() {
    const styles = require('./App.scss');

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
          <a onClick={this.triggerLoadInfo}>test API</a>
          {this.props.children}
        </div>
      </div>
    );
  }
}
