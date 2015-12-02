import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, findRenderedDOMComponentWithClass, Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import sinon from 'sinon';
import {TextInput } from 'components';
import {Provider} from 'react-redux';
import createStore from 'redux/createStore';
//import ApiClient from 'helpers/ApiClient';
//const client = new ApiClient();

describe('TextInput', () => {

  let sandbox = null;
  let comp = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render correctly', () => {
    const comp = renderIntoDocument(
      <TextInput/>
    );
    return expect(comp).to.be.ok;
  });


  // 測試blur時，handleCheckPhoneNumber function是否會觸發
  it('call handleCheckPhoneNumber on Blur', () => {

    const spy = sinon.stub(TextInput.prototype, 'handleCheckPhoneNumber').returns();
    const comp = renderIntoDocument(
      <TextInput/>
    );
    const textInput = findRenderedDOMComponentWithClass(comp, 'textInput');

    Simulate.blur(textInput);
    return expect(spy.called).to.be.true;
  });


});
