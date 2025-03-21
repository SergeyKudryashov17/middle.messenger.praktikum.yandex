import { expect } from "chai";
import sinon from "sinon";
import { BaseLink as Link } from "./Link";

describe("Тест компонента Link", () => {
    let routerMock: any;

    beforeEach(() => {
        routerMock = {
            go: sinon.fake(),
        };
    });

    it("Вызов метода Router.go по клику на компонент", () => {
        const instance = new Link({
            label: "Click",
            href: "/index",
            router: routerMock,
        });

        const { element } = instance;
        element?.click();

        expect(routerMock.go.callCount).to.eq(1);
    });

    it("Вызов метода Router.go по клику на компонент, с параметрами указанными в компоненте", () => {
        const href = "/index";
        const instance = new Link({
            label: "Click",
            href,
            router: routerMock,
        });

        const { element } = instance;
        element?.click();

        expect(routerMock.go.firstArg).to.eq(href);
    });

    it("Проверка отрисовки верного текста в элементе", () => {
        const label = "Click";
        const instance = new Link({
            label,
            href: "/index",
            router: routerMock,
        });

        const { element } = instance;
        const textContent = element?.textContent;

        expect(textContent).to.eq(label);
    });
});
