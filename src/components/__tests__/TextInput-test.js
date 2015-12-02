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
    comp = renderIntoDocument(
      <TextInput />
    );
  });

  afterEach(() => {

  });

  it('should render correctly', () => {
    comp = renderIntoDocument(
      <TextInput />
    );
    return expect(comp).toBeTruthy();
  });


  // 測試blur時，handleCheckPhoneNumber function是否會觸發

  it('call handleCheckPhoneNumber on Blur', () => {

    //const spy = sandbox.stub(TextInput.prototype, 'handleCheckPhoneNumber').returns();
    spyOn(TextInput.prototype, 'handleCheckPhoneNumber').and.callThrough();
    comp = renderIntoDocument(
      <TextInput />
    );
    const textInput = findRenderedDOMComponentWithClass(comp, 'textInput');

    Simulate.blur(textInput);
    return expect(comp.handleCheckPhoneNumber.calls.any()).toEqual(true);
  });


  it('call handleCheckPhoneNumber(5) = 25', () => {
    comp.handleCheckPhoneNumber(5);
    return expect(comp.state.counter).toEqual(25);

  });

});
