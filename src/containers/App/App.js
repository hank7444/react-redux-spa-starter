import React, { Component, PropTypes } from 'react';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    );
  }
}
