import store, { StoreEvents } from "../core/Store";
import isEqual from "../utils/isEqual";
import Block from "../core/Block";
import { IState } from "../api/types";

export function withStore<SP>(mapStateToProps: (state: IState) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {

    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const propsFromState = mapStateToProps(store.getState());

          if (isEqual(previousState, propsFromState)) {
            return;
          }

          previousState = propsFromState;
          this.setProps({ ...propsFromState });
        })
      }
    }
  }
}
