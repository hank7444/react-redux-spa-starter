import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbars extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    style: {},
  };

  componentDidMount() {

  }

  getValues() {
    return this.self.getValues();
  }

  scrollTop(top) {
    this.self.scrollTop(top);
  }

  scrollToTop() {
    this.self.scrollToTop();
  }

  renderTrackHorizontal(props) {
    return (
      <div {...props} className="track-horizontal" style={{ display: 'none' }} />
    );
  }

  renderTrackVertical(props) {
    return (
      <div {...props} className="track-vertical" />
    );
  }

  renderThumbHorizontal(props) {
    return (
      <div {...props} className="thumb-horizontal" />
    );
  }

  renderThumbVertical(props) {
    return (
      <div {...props} className="thumb-vertical" />
    );
  }

  render() {

    const {children, className, style} = this.props;

    return (
      <Scrollbars
        {...this.props}
        ref={ref => { this.self = ref; }}
        className={`scrollbars ${className}`}
        style={style}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderThumbVertical={this.renderThumbVertical}
      >
        {children}
      </Scrollbars>
    );
  }
}
