import Block from "../../core/Block";

import "./interlocutor.css";
import { withStore } from "../../hocs/withStore";
import { getChatsState } from "../../utils/getChatsState";
import { IShortDataChat } from "../../api/types";

interface IInterlocutorProps {
    selectedChat?: IShortDataChat;
}

class Interlocutor extends Block {
    constructor(props: IInterlocutorProps) {
        super("div", { ...props });
    }

    render(): string {
        const nameChat = this.props.selectedChat?.title || "Без названия";
        const styleAvatar = this.props.selectedChat?.avatar
            ? `background: url(${this.props.selectedChat?.avatar}) cover/center`
            : "";

        return `
            <div class="interlocutor">
                <div class="interlocutor__photo" style="${styleAvatar}"></div>
                <div class="interlocutor__name">${nameChat}</div>
            </div>
        `;
    }
}

export default withStore(getChatsState)(Interlocutor);
