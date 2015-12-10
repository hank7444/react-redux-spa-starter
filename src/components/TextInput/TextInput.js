import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {increment} from 'redux/modules/counter';


export default class TextInput extends Component {


  componentDidMount() {
    document.addEventListener("click", this.clickConfig, false);
    this.refs.input.addEventListener('click', function(e) {
      e.stopPropagation();
      console.debug('click from input!!');
    });
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('TextInput will update');
  }


  componentWillUnmount() {
    console.debug('componentUnMount!');
    document.removeEventListener("click", this.clickConfig);
  }


  clickConfig() {
    console.debug('click from window! -- TextInput');
  }




  handleCheckPhoneNumber(num) {
    console.log('handleCheckPhoneNumber is running.');
    this.setState({
      counter: num * 5
    }, function() {
      console.log('@@@@@@#####BBBBB');
    });
  }

  render() {



    return (
       <div>
          <input ref="input"
            type="text"
            className="textInput"
            onBlur={this.handleCheckPhoneNumber.bind(this, 2)} />
        </div>
    );
  }
}

