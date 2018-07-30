import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import ReactTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

export default class Tooltip extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    const { className } = this.props;

    return (
      <ReactTooltip overlayClassName={`${className} ignore-react-onclickoutside`} placement="right" overlay="" trigger={['click', 'hover']}>
        <div className="tooltip-container">
          <div className="tooltip-indicator icon-question-circle"></div>
        </div>
      </ReactTooltip>
    );
  }
}
