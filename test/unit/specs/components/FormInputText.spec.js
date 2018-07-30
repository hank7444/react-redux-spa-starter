import React, {PropTypes} from 'react';
import {shallow, mount, render} from 'enzyme';
import {is, fromJS} from 'immutable';

import FormInputText from 'src/components/FormInputText/FormInputText';

describe('<FormInputText />', () => {
  let comp = null;
  let inst = null;
  let input = null;
  let props = {};
  let options = {};

  beforeEach(() => {

    spyOn(FormInputText.prototype, '_showTooltip').and.callThrough();
    spyOn(FormInputText.prototype, '_hideTooltip').and.callThrough();

    props = {
      onChange: jasmine.createSpy('onChange').and.callThrough(),
      onFocus: jasmine.createSpy('onFocus').and.callThrough(),
      onBlur: jasmine.createSpy('onBlur').and.callThrough(),
      isTestMode: true,
    };

    comp = mount(
      <FormInputText {...props} />
    );

    inst = comp.instance();

    input = comp.find('input');
  });


  it('測試prop是否有被正確塞入', () => {

    comp.setProps({
      type: 'password',
      className: 'test',
      disabled: true,
      readonly: true,
      placeholder: 'test',
      value: 1234,
    });

    input = comp.find('input');

    expect(input.prop('type')).toBe('password');
    expect(input.hasClass('readonly')).toBe(true);
    expect(input.prop('readOnly')).toBe(true);
    expect(input.prop('disabled')).toBe(true);
    expect(input.prop('placeholder')).toBe('test');
    expect(input.prop('value')).toBe(1234);
  });

  it('測試onChange, onFocus, onBlur是否有被呼叫到', () => {

    input.simulate('change', {target: {value: 'newValue'}});
    expect(props.onChange).toHaveBeenCalledTimes(1);

    input.simulate('focus');
    expect(props.onFocus).toHaveBeenCalledTimes(1);
    expect(FormInputText.prototype._showTooltip).toHaveBeenCalledTimes(1);

    input.simulate('blur');
    expect(props.onBlur).toHaveBeenCalledTimes(1);
    expect(FormInputText.prototype._hideTooltip).toHaveBeenCalledTimes(1);
  });

  it('如果prop tooltip 沒輸入時， 不顯示內容', () => {
    expect(inst._showTooltip()).toEqual(false);
  });

  it('onFocus時，如果prop tooltip有設定，會出現tooltip, 但readonly時不顯示', () => {
    comp.setProps({
      tooltip: {
        text: 'hello',
      },
    });

    input.simulate('focus');
    expect(FormInputText.prototype._showTooltip).toHaveBeenCalledTimes(1);


    comp.setProps({
      tooltip: {
        text: 'hello',
      },
      readonly: true,
    });

    input.simulate('focus');
    expect(FormInputText.prototype._showTooltip).toHaveBeenCalledTimes(1);
  });


  it('測試prop maxLength', () => {
    comp = mount(
      <FormInputText maxLength={3} isTestMode />
    );

    comp.setProps({
      value: 'thisMyValHelloWorld',
    });

    expect(comp.state('value')).toBe('thi');
  });

  it('測試prop valueProcessor=integer, onlyPositive', () => {
    comp = mount(
      <FormInputText valueProcessor="integer" onlyPositive isTestMode />
    );

    comp.setProps({
      value: '4124.12345',
    });

    expect(comp.state('value')).toBe('4124');

    comp.setProps({
      value: '-4124.12345',
    });

    expect(comp.state('value')).toBe('4124');

    comp.setProps({
      value: 'aaab1234',
    });

    expect(comp.state('value')).toBe('1234');
  });

  it('測試prop valueProcessor=float, onlyPositive', () => {
    comp = mount(
      <FormInputText valueProcessor="float" onlyPositive isTestMode />
    );

    comp.setProps({
      value: '4124.12345',
    });

    expect(comp.state('value')).toBe('4124.12345');

    comp.setProps({
      value: '-4124.12345',
    });

    expect(comp.state('value')).toBe('4124.12345');

    comp.setProps({
      value: 'aaab1234.555',
    });

    expect(comp.state('value')).toBe('1234.555');
  });

  it('測試 prop isShowCounter=true, 出現計數器', () => {
    comp = mount(
      <FormInputText isShowCounter isTestMode />
    );

    comp.setProps({
      value: 'hello',
    });

    comp.setState({
      isFocused: true,
    });

    expect(comp.find('.form-input-text-counter').length).toBe(1);
    expect(comp.find('.form-input-text-counter').text()).toBe('5');
  });

  it('測試 prop isShowCounter=true, 出現計數器, 如果有設置 maxLength, 則計數器顯示 maxLength - 目前字數', () => {
    comp = mount(
      <FormInputText isShowCounter maxLength={30} isTestMode />
    );

    comp.setProps({
      value: 'hello',
    });

    comp.setState({
      isFocused: true,
    });

    expect(comp.find('.form-input-text-counter').text()).toBe('25');
  });

});
