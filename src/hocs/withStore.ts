import store, { StoreEvents } from "../core/Store";
import isEqual from "../utils/isEqual";

export function withStore(mapStateToProps: (state: any)=> any) {
  return function wrap(Component) {
    let currentState = null;

    return class WithStore extends Component {
      constructor(props) {
        const state = store.getState();
        currentState = mapStateToProps(state);

        super({ ...props, ...currentState });

        store.on(StoreEvents.Updated, () => {
          const state = store.getState();
          const propsFromState = mapStateToProps(state);

          if (isEqual(currentState, propsFromState)) {
            return;
          }

          this.setProps({ ...propsFromState });
        })
      }
    }
  }
}
