import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    default: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    }
  }
}) as { default: typeof BlockType };

describe.only('Тестирование базового класса Block.ts', () => {
  class ComponentMock extends Block {}

  it('Срабатывание события init жизненного цикла компонента',  () => {
    new ComponentMock('div', {});
    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });
});
