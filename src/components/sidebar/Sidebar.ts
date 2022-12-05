import Block from '../../core/Block';
import DialogList from "../dialogList/DialogList";
import Input from "../input/Input";
import Link from "../link/Link";

import './sidebar.css';

export default class Sidebar extends Block {
    constructor(props) {
        props.search = new Input({
            type: 'text',
            className: 'input_search-dialog',
            placeholder: '&#xf002; Поиск'
        });

        props.profileLink = new Link({
            href: '/src/pages/profile/index.html',
            label: 'Профиль >'
        });

        props.backLink = new Link({
            href: '#',
            className: 'button button_main button_circle link_white',
            label: '<i class="fa fa-arrow-left" aria-hidden="true"></i>'
        });

        props.dialogListComponent = new DialogList({
            dialogsData: props.dialogList
        });

        super("aside", {...props});
    }

    render(): string {
        const isFullSize: Boolean = Boolean(this.props.isFullSize);

        const sidebarHead: string = `
            <div class="sidebar__head">
                <div class="messenger-controls">
                    {{{ profileLink }}}
                </div>
                {{{ search }}}
            </div>
        `;

        return `
            <aside class="sidebar ${ !isFullSize ? 'sidebar_small sidebar_empty' : '' }">
                ${ isFullSize ? sidebarHead : '' }
                <div class="sidebar__body ${ !isFullSize ? 'sidebar__body_centered' : '' }">
                    ${ isFullSize ? '{{{ dialogListComponent }}}' : '{{{ backLink }}}' }
                </div>
            </aside>
        `;
    }
}