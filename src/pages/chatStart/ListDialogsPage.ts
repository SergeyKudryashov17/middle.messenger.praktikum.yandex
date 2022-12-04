import Block from '../../core/Block';
import Sidebar from "../../components/sidebar/Sidebar";

export default class ListDialogsPage extends Block {
    constructor(props: any = {}) {
        props.sidebar = new Sidebar({
            isFullSize: true
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