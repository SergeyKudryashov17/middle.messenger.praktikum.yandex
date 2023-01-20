import store, { StoreEvents } from "../core/Store";
import isEqual from "../utils/isEqual";
import Block from "../core/Block";

export function withStore(mapStateToProps: (state: any)=> any) {
  return function wrap(Component: typeof Block) {
    let currentState = null;

    return class WithStore extends Component {
      constructor(props) {
        const state = store.getState();
        currentState = mapStateToProps(state);

        super({ ...props, ...currentState });

        store.on(StoreEvents.Updated, () => {
          const state = store.getState();
          const propsFromState = mapStateToProps(state);

          // console.log('текущее состояние', currentState);
          // console.log('новое состояние', propsFromState);
          // console.log('сравнение состояний', isEqual(currentState, propsFromState));
          // if (isEqual(currentState, propsFromState)) {
          //   return;
          // }
          //
          console.log('new props', propsFromState);
          this.setProps({ ...propsFromState });
        })
      }
    }
  }
}
