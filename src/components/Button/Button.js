import React from 'react';
import PropTypes from 'prop-types';
import { touchDeviceHoverHandler } from 'shared/util/touchDevice';

const DEFAULT_BUTTON_CLASS = {
  normal: 'btn',
  hover: 'btn-hover',
};

export default class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    hoverClassName: PropTypes.string,
  }

  static defaultProps = {
    className: DEFAULT_BUTTON_CLASS.normal,
    hoverClassName: DEFAULT_BUTTON_CLASS.hover,
  };

  componentDidMount() {
    const { hoverClassName } = this.props;
    const hoverClass = hoverClassName ? `${DEFAULT_BUTTON_CLASS.hover} ${hoverClassName}` : DEFAULT_BUTTON_CLASS.hover;
    touchDeviceHoverHandler(this._button, hoverClass);
  }

  render() {
    const { className, hoverClassName, children, ...others } = this.props;
    const child = children || '';
    return (
      <button
        ref={(ref) => { this._button = ref; }}
        className={`${DEFAULT_BUTTON_CLASS.normal} ${className}`}
        {...others}
      >
        {child}
      </button>
    );
  }
}
