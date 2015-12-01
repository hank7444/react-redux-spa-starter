import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import $ from 'jquery';

// 使用jquery 範例

export default class JqueryFadeIn extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context); // 這邊要設定, 在contstructor裡面才拿的到this.props, 跟this.context
    this.state = {
      seconds: 0
    };

    //console.log('[TickTock] this in constructor', this);

    // 這邊要綁定，tick()才拿到的this.state, this.context, this.props
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);

  }


  componentDidMount() {
    this.$this = $(ReactDOM.findDOMNode(this));
  }


  /*
  盡量避免在componentWillReceiveProps中去做邏輯判斷，
  因為在複雜的巢狀下，
  componentWillReceiveProps被觸發時機點就會很難掌控也很不容易追蹤，容易出現預料之外的狀況
  */
  componentWillReceiveProps(nextProps) {


  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.isLoading) {
      this.fadeIn();
    } else {
      this.fadeOut();
    }
  }

  fadeIn() {
    console.log('####Call JqueryFadeIn fadeIn()');
    //const $el = $(ReactDOM.findDOMNode(this));

    this.$this.fadeIn(1000, () => {
      console.log('####FadeIn callback triiger!');
    });
  }

  fadeOut() {
    this.$this.fadeOut();
  }

  render() {

    return (
      <h1 style={{display: 'none'}}>Loading...</h1>
    );
  }
}
