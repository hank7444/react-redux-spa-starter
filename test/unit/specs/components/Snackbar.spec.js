import React from 'react';
import {shallow, mount, render} from 'enzyme';

import Snackbar from 'src/components/SnackBar/SnackBar';

describe('<Snackbar />', () => {

  let comp = null;
  let props = {

  };
  let inst = null;


  beforeEach(() => {
    comp = mount(
      <Snackbar />
    );

    inst = comp.instance();
  });


  it('測試不同 type', () => {
    const id = inst.addMsg({
      type: 'fail',
      duration: 0,
    });

    comp.update();
    expect(comp.find('.snackbar-fail').length).toBe(1);


    inst.addMsg({
      type: 'success',
      duration: 0,
    });
    inst.removeMsg(id);

    comp.update();
    expect(comp.find('.snackbar-success').length).toBe(1);
  });

  xit('測試不存在的 type', () => {
    inst.addMsg({
      type: 'noexist',
      duration: 0,
    });

    comp.update();
    expect(comp.find('.snackbar-fail').length).toBe(1);
    expect(comp.find('.snackbar-success').length).toBe(0);
  });

  xit('當一則訊息顯示時，其他訊息會堆疊起來', (done) => {

    const id = inst.addMsg({
      text: 'test',
      duration: 0,
    });

    inst.addMsg({
      text: 'test',
      duration: 200,
    });

    inst.addMsg({
      text: 'test',
      duration: 200,
    });

    comp.update();
    expect(inst.msgs.length).toBe(2);

    // 移除一個才會繼續顯示其他的
    inst.removeMsg(id);
    expect(inst.msgs.length).toBe(1);

    inst._handleOnExited();
    setTimeout(() => {
      expect(inst.msgs.length).toBe(0);
      done();
    }, 200);

  });
});
