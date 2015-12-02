import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, findRenderedDOMComponentWithClass, Simulate} from 'react-addons-test-utils';
import {TextInput } from 'components';
import {Provider} from 'react-redux';
import createStore from 'redux/createStore';
//import ApiClient from 'helpers/ApiClient';
//const client = new ApiClient();

describe('TextInput', () => {

  let comp = null;

  beforeEach(() => {

    /*
      By chaining the spy with and.callThrough,
      the spy will still track all calls to it but in addition
      it will delegate to the actual implementation.
      簡單說就是被spy的function在被spy後就還給你原來的function了
    */
    spyOn(TextInput.prototype, 'handleCheckPhoneNumber').and.callThrough();
    comp = renderIntoDocument(
      <TextInput />
    );
  });

  afterEach(() => {

  });

  it('should render correctly', () => {
    return expect(comp).toBeTruthy();
  });


  // 測試blur時，handleCheckPhoneNumber function是否會觸發

  it('call handleCheckPhoneNumber on Blur', () => {

    const textInput = findRenderedDOMComponentWithClass(comp, 'textInput');

    Simulate.blur(textInput);

    expect(comp.state.counter).toEqual(10);
    expect(comp.handleCheckPhoneNumber.calls.any()).toEqual(true);
  });


  it('call handleCheckPhoneNumber(5) = 25', () => {
    comp.handleCheckPhoneNumber(5);
    expect(comp.state.counter).toEqual(25);
  });

});
