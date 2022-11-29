import Block from "../../core/Block";

import './avatar.css';

export default class Avatar extends Block {
    constructor(props) {
        // Создаём враппер дом-элемент button
        super("a", {...props});
    }

    render() {
        return `
            <div class="avatar avatar_big avatar_centered avatar_profile">
                <img src="${this.props.url}" alt="" class="">
            </div>
        `;
    }
}


