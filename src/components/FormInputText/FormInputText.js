import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import { integerFilter, floatFilter } from 'shared/util/number';

export default class FormInputText extends Component {

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    valueProcessor: PropTypes.oneOf(['', 'integer', 'float']),
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    placeholder: PropTypes.string,
    onlyPositive: PropTypes.bool,
    maxLength: PropTypes.number,
    isSelectAllTextOnFocus: PropTypes.bool,
    isShowCounter: PropTypes.bool,
    isTestMode: PropTypes.bool,
    tooltip: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    id: '',
    name: '',
    type: 'text',
    valueProcessor: '',
    className: '',
    style: {},
    disabled: false,
    readonly: false,
    placeholder: '',
    onlyPositive: false,
    isSelectAllTextOnFocus: false,
    isShowCounter: false,
    isTestMode: false,
    tooltip: {
      text: '',
      parent: null,
      maxWidth: 0,
      offsetX: 0,
      offsetY: 0,
    },
    value: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      isFocused: false,
    };

    this.TOOLTIP_OFFSET_X = 5;
    this.TOOLTIP_OFFSET_Y = 4;

    this.valueProcessor = (value = '') => {
      const { valueProcessor, onlyPositive, maxLength } = this.props;
      let output = value;

      if (valueProcessor === 'integer') {
        output = integerFilter(value, onlyPositive);
      } else if (valueProcessor === 'float') {
        output = floatFilter(value, onlyPositive);
      }

      if (maxLength) {
        output = output.slice(0, maxLength);
      }

      return output;
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);

    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);

    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnFocus = this._handleOnFocus.bind(this);
    this._handleOnBlur = this._handleOnBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    const { value: nextValue } = nextProps;

    if (value !== nextValue) {
      this._setValue(this.valueProcessor(nextValue));
    }
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentWillUnmount() {
    this._hideTooltip();
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    const { onChange } = this.props;

    if (onChange && typeof onChange === 'function') {
      onChange(value);
    }

    this.setState({
      value,
    });
  }

  _setValue(value) {
    this.setState({
      value,
    });
  }

  _showTooltip(e) {
    const { TOOLTIP_OFFSET_X, TOOLTIP_OFFSET_Y } = this;
    const { tooltip } = this.props;
    const offsetX = tooltip.offsetX;
    const offsetY = tooltip.offsetY || TOOLTIP_OFFSET_Y;

    if (!tooltip.text || this.tooltipWrapper) {
      return false;
    }

    const parent = ReactDOM.findDOMNode(tooltip.parent) || document.body;
    const inputWidth = e.target.offsetWidth;
    const inputHeight = e.target.offsetHeight;
    const bodyWidth = document.body.offsetWidth;
    const rect = e.target.getBoundingClientRect();
    const tooltipWrapper = document.createElement('div');
    const tooltipStyle = tooltip.maxWidth ? {
      maxWidth: tooltip.maxWidth,
    } : {};

    ReactDOM.render(
      <span className="tooltip" style={tooltipStyle}>{tooltip.text}</span>,
      tooltipWrapper,
    );
    parent.appendChild(tooltipWrapper);


    const tooltipDom = tooltipWrapper.childNodes[0];
    const tooltipWidth = tooltipDom.offsetWidth;
    let left = rect.left - tooltipWidth / 2 + inputWidth / 2;
    const top = rect.top + inputHeight + offsetY + parent.scrollTop;

    if (offsetX) {
      left = left + offsetX;
    } else if (left + tooltipWidth > bodyWidth) {
      left = bodyWidth - tooltipWidth - TOOLTIP_OFFSET_X;
    }

    tooltipWrapper.childNodes[0].style.top = `${top}px`;
    tooltipWrapper.childNodes[0].style.left = `${left}px`;

    this.tooltipWrapper = tooltipWrapper;
    this.tooltipParent = parent;
  }

  _hideTooltip() {
    if (this.tooltipWrapper && this.tooltipParent) {
      this.tooltipParent.removeChild(this.tooltipWrapper);
      this.tooltipWrapper = null;
      this.tooltipParent = null;
    }
  }

  _handleOnChange() {
    const { input } = this;
    const { onChange } = this.props;
    const output = this.valueProcessor(input.value);

    if (onChange && typeof onChange === 'function') {
      onChange(output);
    }

    this.setState({
      value: output,
    });
  }

  _handleOnFocus(e) {
    const { input } = this;
    const { isSelectAllTextOnFocus, onFocus, readonly } = this.props;

    if (isSelectAllTextOnFocus && !readonly) {
      setTimeout(() => {
        input.setSelectionRange(0, input.value.length);
      }, 0);
    }

    if (!readonly) {
      this._showTooltip(e);
    }

    if (onFocus && typeof onFocus === 'function') {
      onFocus();
    }

    this.setState({
      isFocused: true,
    });
  }

  _handleOnBlur() {
    const { onBlur } = this.props;
    const { value } = this.state;

    this._hideTooltip();

    if (onBlur && typeof onBlur === 'function') {
      onBlur(value);
    }

    this.setState({
      isFocused: false,
    });
  }

  getValueLength(value) {
    if (typeof value === 'number') {
      value = String(value);
    } else if (typeof value !== 'string') {
      value = '';
    }

    return value.length;
  }

  render() {
    const {
      id,
      name,
      type,
      placeholder,
      className,
      style,
      maxLength,
      disabled,
      readonly,
      isShowCounter,

    } = this.props;
    const { value, isFocused } = this.state;
    const readonlyClass = readonly ? 'readonly' : '';
    const isShowCounterClass = isShowCounter ? 'has-counter' : '';
    const valueLength = this.getValueLength(value);

    let remainWordNum = maxLength ? maxLength - valueLength : valueLength;
    remainWordNum = remainWordNum > 0 ? remainWordNum : 0;

    return (
      <div className="input-box">
        <input
          ref={ref => { this.input = ref; }}
          id={id}
          name={name}
          className={`form-input-text ${isShowCounterClass} ${className} ${readonlyClass}`}
          style={style}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          value={value}
          onChange={this._handleOnChange}
          onFocus={this._handleOnFocus}
          onBlur={this._handleOnBlur}
        />
        {isShowCounter && isFocused && <span className="form-input-text-counter">{remainWordNum}</span>}
      </div>
    );
  }
}
