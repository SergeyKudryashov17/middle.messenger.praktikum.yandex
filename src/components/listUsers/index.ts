import Block from "../../core/Block";
import { FullUserData } from "../../api/types";
import userItem from "../userItem";
import isEqual from "../../utils/isEqual";

type ListUsersProps = {
  listItemsLabels?: string,
  listChatUsers?: FullUserData[]
}

export default class ListUsers extends Block {
  private listItemsLabels: string = '';

  constructor(props: ListUsersProps) {

    super('div', { ...props });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!isEqual(oldProps, newProps)) {
      if (newProps.listChatUsers?.length === 0) {
        this.listItemsLabels = '';
        this.children = {};
        (this.getContent() as HTMLElement).innerHTML = '';
      }else {
        newProps.listChatUsers?.forEach((user: FullUserData, index: number) => {
          const label = `itemUser${index}`;
          this.children[label] = new userItem(user);
          this.listItemsLabels += `{{{ ${label} }}}`;
        });
      }
      return true;
    }
    return false;
  }

  render(): string {
    return `<div class="list-users">${this.listItemsLabels}</div>`;
  }
}
