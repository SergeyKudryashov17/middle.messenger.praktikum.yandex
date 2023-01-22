import store, { StoreEvents } from "../core/Store";
import isEqual from "../utils/isEqual";
import Block from "../core/Block";
import cloneDeep from "../utils/cloneDeep";

export function withStore(mapStateToProps: (state: any)=> any) {
  return function wrap(Component: typeof Block) {
    let currentState = null;

    return class WithStore extends Component {
      constructor(props) {
        // const state = cloneDeep();
        currentState = mapStateToProps(store.getState());

        super({ ...props, ...currentState });

        store.on(StoreEvents.Updated, () => {
          const state = store.getState();
          const propsFromState = mapStateToProps(state);

          if (isEqual(currentState, propsFromState)) {
            return;
          }

          console.log(this, currentState, propsFromState);
          this.setProps({ ...propsFromState });
        })
      }
    }
  }
}
