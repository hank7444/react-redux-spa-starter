import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import {
  NativeOptionCreater,
  DropDownOptionsCreater,
  AutoWidthOptionsCreater,
} from './OptionsCreator';

import DeviceDetect from 'shared/device/DeviceDetect';
import { touchDeviceHoverHandler } from 'shared/util/touchDevice';

import $ from 'jquery';

export default class ModalSelect extends Component {

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    hoverClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.any,
    labelKey: PropTypes.string,
    value: PropTypes.any,
    valueKey: PropTypes.string,
    disableOption: PropTypes.bool,
    zIndex: PropTypes.number,
    isSetDefaultOption: PropTypes.bool,
    enableHover: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    className: '',
    hoverClassName: 'md-select-hover',
    menuClassName: '',
    type: !DeviceDetect.isDesktop ? 'native' : 'dropdown', // full, dropdown, native, autoWidth
    title: '',
    name: '',
    options: [],
    placeholder: '',
    label: '',
    labelKey: 'label',
    value: '',
    valueKey: 'value',
    disableOption: false,
    zIndex: 0.5,
    isSetDefaultOption: true,
    enableHover: false,
  };

  static selectSet = new Set();

  static init = () => {
    if (ModalSelect.hasInit) {
      return false;
    }

    $(document).on('click.md-select-modal', ModalSelect.closeAllSelect);
    ModalSelect.hasInit = true;
  };

  static closeAllSelect = (e) => {
    let target = e.target;
    while (target) {
      if (target.className === 'md-select-scroller-wrap') {
        return;
      }
      target = target.parentNode;
    }

    for (let select of ModalSelect.selectSet) {
      select.closeSelect(e);
    }
  };

  constructor(props) {
    super(props);

    const type = this.props.type;

    this.selectContainer = null;

    if (type === 'dropdown') {
      ModalSelect.init(this);
      ModalSelect.selectSet.add(this);
      this.optionCreater = DropDownOptionsCreater;
    } else if (type === 'autoWidth') {
      ModalSelect.init(this);
      ModalSelect.selectSet.add(this);
      this.optionCreater = AutoWidthOptionsCreater;
    } else {
      this.optionCreater = NativeOptionCreater;
    }

    this.showOptions = this.showOptions.bind(this);
    this.closeSelect = this.closeSelect.bind(this);
    this.handleClickOption = this.handleClickOption.bind(this);
    this.resize = this.resize.bind(this);

    this.state = {
      isOptionsOpen: false,
      value: '',
      label: '',
    };

    this.setDefaultOption(props, true);
  }

  componentDidMount() {
    this.optionCreater.render.apply(this);

    $(window).bind('resize', this.resize);

    if (this.props.enableHover) {
      touchDeviceHoverHandler(this.selectContainer, this.props.hoverClassName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.options != this.props.options) || (nextProps.value != this.state.value)) {
      this.setDefaultOption(nextProps);
    }
  }

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.options != this.props.options) {
      this.optionCreater.update.apply(this);
    } else if (prevState.value != this.state.value) {
      this.optionCreater.updateValue.apply(this);
    }
  }

  componentWillUnmount() {
    ModalSelect.selectSet.delete(this);
    this.optionCreater.destroy.apply(this);

    $(window).unbind('resize', this.resize);
  }

  setDefaultOption(props, isConstructor) {
    let value = '';
    let label = '';

    if (props.value) {
      value = props.value;
      label = props.label;
    } else if (this.props.isSetDefaultOption && this.props.options.length > 0) {
      const defaultOption = props.options[0];

      value = defaultOption[this.props.valueKey];
      label = defaultOption[this.props.labelKey];
    } else {
      value = '';
      label = props.placeholder;
    }

    if (isConstructor) {
      this.state.value = value;
      this.state.label = label;
    } else {
      this.setState({
        value,
        label,
      });
    }
  }

  handleClickOption(option) {
    const { name, valueKey, labelKey, onChange } = this.props;

    this.setState({
      value: option[valueKey],
      label: option[labelKey],
    });

    if (onChange && typeof onChange === 'function') {
      onChange(name, option);
    }

    this.closeSelect();
  }

  showOptions() {
    const { name, options, disableOption, onClick } = this.props;
    const { isOptionsOpen } = this.state;

    if (onClick && typeof onClick === 'function') {
      onClick(name);
    }

    if (!options.length || disableOption) {
      return false;
    }

    if (isOptionsOpen) {
      this.closeSelect();
      return false;
    }

    this.optionCreater.show.apply(this);

    this.setState({
      isOptionsOpen: true,
    });
  }

  closeSelect(e) {

    if (e && $.contains(this.selectContainer, e.target)) {
      return false;
    }

    this.optionCreater.close.apply(this);

    this.setState({
      isOptionsOpen: false,
    });
  }

  resize() {
    this.optionCreater.updatePosition.apply(this);
  }

  render() {
    const { style, options, placeholder, disableOption } = this.props;
    const { label } = this.state;
    const _label = options.length ? label : placeholder;
    const _style = disableOption || !options.length ? Object.assign({}, style, { opacity: 0.5, cursor: 'not-allowed' }) : style;
    const option = options.find(item => item.label === label) || {};
    const _labelStyle = option.soldOutText ? { textDecoration: 'line-through' } : {};

    return (
      <div
        style={_style}
        className={`md-select ${this.props.className}`}
        ref={(ref) => { if (ref) this.selectContainer = ref; }}
      >
        <div className="md-select-label" onClick={this.showOptions} style={_labelStyle}>
          {_label}
          <i className="arrow_down icon-collapse"></i>
        </div>
      </div>
    );
  }
}
