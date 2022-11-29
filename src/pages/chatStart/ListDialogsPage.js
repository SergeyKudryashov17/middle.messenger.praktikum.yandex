import Block from '../../core/Block.js';
import Sidebar from "../../components/sidebar/Sidebar.js";

export default class ListDialogsPage extends Block {
    constructor(props = {}) {
        props.sidebar = new Sidebar({
            isFullSize: true
        });

        super("div", {...props});
    }

    render() {
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