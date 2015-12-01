import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './AnimationTest.scss';

export default class AnimationTest extends Component {

  constructor(props, context) {
    super(props, context); // 這邊要設定, 在contstructor裡面才拿的到this.props, 跟this.context

    this.state = {
      items: ['hello', 'world', 'click', 'me']
    };
  }


  handleAdd() {
    const newItems = this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    const newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }


  render() {

    const items = this.state.items.map((item, i) => {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }, this);


    return (
      <div>
        <button onClick={this.handleAdd.bind(this)}>Add Item</button>

        {/*
        transitionEnterTimeout: 當物件進入動畫超過設定時間，就直接結束動畫(出現)
        transitionLeaveTimeout: 同上，時間到動畫還沒播完就直接消失,
        但是要注意如果transitionLeaveTimeout > 動畫播放時間，要等transitionLeaveTimeout時間到了物件才會移除
        */}
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={3000} transitionLeaveTimeout={3000}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
