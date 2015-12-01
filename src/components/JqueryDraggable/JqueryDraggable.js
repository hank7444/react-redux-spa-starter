import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import $ from 'jquery';
import 'jquery-ui';

// 使用jquery + jquery-ui 範例
export default class JqueryDraggable extends Component {

  static propTypes = {
    //isLoading: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context); // 這邊要設定, 在contstructor裡面才拿的到this.props, 跟this.context

  }


  componentDidMount() {
    this.$this = $(ReactDOM.findDOMNode(this));
    this.$this.draggable();
  }

  componentWillReceiveProps(nextProps) {


  }
  render() {

    return (
      <div className="ui-widget-content">
        <p>Drag me around</p>
      </div>
    );
  }
}
