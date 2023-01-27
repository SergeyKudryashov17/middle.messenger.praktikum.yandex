import store, { StoreEvents } from "../core/Store";
import isEqual, { PlainObject } from "../utils/isEqual";
import { IState } from "../api/types";
import { BlockConstructable } from "./types";

export function withStore(mapStateToProps: (state: IState) => any) {
    return function wrap(Component: BlockConstructable) {
        return class WithStore extends Component {
            constructor(props: any) {
                let previousState = mapStateToProps(store.getState());

                super({ ...props, ...previousState });

                store.on(StoreEvents.Updated, () => {
                    const propsFromState = mapStateToProps(store.getState());

                    if (isEqual(previousState as PlainObject, propsFromState as PlainObject)) {
                        return;
                    }

                    previousState = propsFromState;
                    this.setProps({ ...propsFromState });
                });
            }
        };
    };
}
