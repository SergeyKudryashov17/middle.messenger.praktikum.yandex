import Router from "../core/Router";
import Block from "../core/Block";
import { BlockConstructable } from "./types";

export function withRouter(Component: BlockConstructable) {
    type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

    return class WithRouter extends Component {
        constructor(props: Props & PropsWithRouter) {
            super({ ...props, router: Router });
        }
    };
}

export interface PropsWithRouter {
    router: typeof Router;
}
