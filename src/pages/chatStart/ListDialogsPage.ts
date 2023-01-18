import Block from '../../core/Block';
import Sidebar from "../../components/sidebar/Sidebar";
import { withStore } from "../../hocs/withStore";

import { getListDialogs } from "../../models/dialogsData";
import { getLoadingState } from "../../utils/getLoadingState";

interface IListDialogsPageProps {
    propDisplay?: string,
    emptyChatBody: boolean,
    sidebar?: Sidebar
}

class ListDialogsPage extends Block {
    constructor(props: IListDialogsPageProps) {
        props.sidebar = new Sidebar({
            isFullSize: true,
            dialogList: getListDialogs()
        });

        super("div", {...props});
    }

    render(): string {
        console.log(this.props);

        if (this.props.isLoading) {
            return `
                <main class="messenger-container">
                    <div class="messenger-body">
                        Loading...
                    </div>
                </main>
            `;
        } else {
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
}

export default withStore(getLoadingState)(ListDialogsPage);
