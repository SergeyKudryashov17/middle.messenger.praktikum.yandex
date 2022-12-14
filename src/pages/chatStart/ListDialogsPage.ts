import Block from '../../core/Block';
import Sidebar from "../../components/sidebar/Sidebar";

import { getListDialogs } from "../../models/dialogsData";

interface IListDialogsPageProps {
    emptyChatBody: boolean
}

export default class ListDialogsPage extends Block {
    constructor(props: IListDialogsPageProps) {
        props.sidebar = new Sidebar({
            isFullSize: true,
            dialogList: getListDialogs()
        });

        super("div", {...props});
    }

    render(): string {
        return `
            <main class="messenger-container">
                <div class="messenger-body">
                    {{{ sidebar }}}
                    <div class="chat-body">
                        <div class="empty-chat-warning">Выберите чат чтобы отправить сообщение</div>                        
                    </div>
                </div>
            </main>
        `;
    }
}
