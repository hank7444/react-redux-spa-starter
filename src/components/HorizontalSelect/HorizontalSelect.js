import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TouchScrollTip from 'components/TouchScrollTip/TouchScrollTip';

export default class HorizontalSelect extends React.PureComponent {
  static propTypes = {
    options: PropTypes.array,
    onClick: PropTypes.func.isRequired,
    isVisibleOnScreen: PropTypes.bool,
  };

  static defaultProps = {
    options: [],
    isVisibleOnScreen: true,
  };

  constructor(props) {
    super(props);

    const options = props.options;
    this.state = {
      value: options.length > 0 ? options[0].value : '',
    };

    this.changeOption = this.changeOption.bind(this);
  }

  changeOption(e) {
    const newValue = e.target.value;
    this.setState({
      value: newValue,
    });

    this.props.onClick(newValue);
  }

  renderOptions() {
    const { value } = this.state;
    const { options } = this.props;

    return options.map((option) => {
      const optionValue = option.value;
      const isActive = value === optionValue;
      return (
        <li className="horizontal-select-item" key={optionValue}>
          <button className={classNames('horizontal-select-item-btn', { active: isActive })} value={optionValue} onClick={this.changeOption}>{option.label}</button>
        </li>
      );
    });
  }

  render() {
    const { isVisibleOnScreen } = this.props;
    return (
      <TouchScrollTip
        className="horizontal-select"
        direction="horizontal"
        tagName="ul"
        isVisibleOnScreen={isVisibleOnScreen}
        isShowTip
        hideTipTimeout={3000}
      >
        {this.renderOptions()}
      </TouchScrollTip>
    );
  }
}
