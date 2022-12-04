import Block from "../../core/Block";

import './avatar.css';

export default class Avatar extends Block {
    constructor(props: any) {
        super("a", {...props});
    }

    render(): string {
        return `
            <div class="avatar avatar_big avatar_centered avatar_profile">
                <img src="${this.props.url}" alt="" class="">
            </div>
        `;
    }
}


