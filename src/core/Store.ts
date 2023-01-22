import { set } from "../utils/set";
import EventBus from "./EventBus";
import { IState } from "../api/types";

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: IState = {
    user: undefined,
    selectedChat: undefined,
    isLoading: undefined,
    messages: undefined,
    chats: undefined
  };

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export default store;
