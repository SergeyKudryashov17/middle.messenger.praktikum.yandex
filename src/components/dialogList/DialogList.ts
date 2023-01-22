import Block from '../../core/Block';
import DialogItem from "../dialogItem/DialogItem";
import { getChatsState } from "../../utils/getChatsState";
import { withStore } from "../../hocs/withStore";

import './dialogList.css';
import { IChat, UserData } from "../../api/types";

export type dialogsData = {
    name: string,
    time: string,
    isMyMessage: boolean,
    preview: string,
    unread: number
}

interface IDialogListProps {
    isLoading?: boolean,
    dialogsData: dialogsData[],
    chatState?: IChat[],
    userState?: UserData,
    dialogComponentsLabels: string
}

class DialogList extends Block {
    constructor(props: IDialogListProps) {
        props.dialogComponentsLabels = '';
        props.chatState?.forEach((data: IChat, index: number) => {
            const componentLabel = `dialog${index}`;
            props.dialogComponentsLabels += `{{{ ${componentLabel} }}}`;
            props[componentLabel] = new DialogItem(data);
        });

        super("div", {...props});
    }

    render(): string {
        const loader: string = `
          <div class="dialog-list__loader">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        `;

        this.dispatchComponentDidMount();
        return `<ul class="dialog-list">
                  ${this.props.chatState === undefined ? loader : this.props.dialogComponentsLabels}
                </ul>`;
    }
}

export default withStore(getChatsState)(DialogList);
