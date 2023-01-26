import { expect } from "chai";
import sinon from "sinon";
import Router from "./Router";

const originalForward = window.history.forward;
const originalBack = window.history.back;

describe("Router test", () => {
    beforeEach(() => {
        Router.reset();
        window.history.forward = sinon.fake();
        window.history.back = sinon.fake();
    });

    after(() => {
        window.history.forward = originalForward;
        window.history.back = originalBack;
    });

    it("Router start", () => {
        expect(1).to.eq(0);
    });

    it("forward", () => {
        Router.forward();
        expect((window.history.forward as any).callCount).to.eq(1);
    });

    it("back", () => {
        Router.back();
        expect((window.history.back as any).callCount).to.eq(1);
    });
});
