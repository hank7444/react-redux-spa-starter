import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { mountWithIntl } from 'test/unit/helpers/intlHelper';
import DialogConfirm from 'src/components/DialogConfirm/DialogConfirm';


describe('<DialogConfirm />', () => {

  let comp = null;
  let props = {};
  let inst = null;

  beforeEach(() => {
    comp = mountWithIntl(
      <DialogConfirm wrappedComponentRef={ref => { inst = ref; }} {...props} />,
    );

    inst.show();
    comp.update();
  });

  afterEach(() => {
    inst.hide();
  });

  it('測試初始化', () => {
    expect(comp.find('.dialog-confirm-container').at(0).text()).toBe('');
    expect(comp.find('.dialog-confirm-btn').at(0).text()).toBe('OK');
  });

  it('測試變更文字', () => {
    inst.show({
      text: 'test text',
      btnText: 'test btn',
    });
    comp.update();

    expect(comp.find('.dialog-confirm-container').at(0).text()).toBe('test text');
    expect(comp.find('.dialog-confirm-btn').at(0).text()).toBe('test btn');
  });

  it('測試okCallback & cancelCallback', () => {
    const options = {
      okCallback: jasmine.createSpy('okCallback'),
    };

    inst.show(options);

    comp.find('.dialog-confirm-btn').at(0).simulate('click');

    expect(options.okCallback).toHaveBeenCalledWith(inst);
  });
});
