import { BaseLink as Link } from "./Link";
import { expect } from "chai";
import sinon from "sinon";

describe.only('Тест компонента Link', () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      go: sinon.fake()
    }
  });

  it ('Вызов метода Router.go по клику на компонент', () => {
    const instance = new Link({
      label: 'Click',
      href: '/index',
      router: routerMock
    });

    const element = instance.element;
    element?.click();

    expect(routerMock.go.callCount).to.eq(1);
  });
});
