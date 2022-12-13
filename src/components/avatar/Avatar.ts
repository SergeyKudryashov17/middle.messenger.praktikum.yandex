import Block from "../../core/Block";

import './avatar.css';

interface IAvatarProps {
    url: string
}

export default class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super("a", {...props});
    }

    render(): string {
        return `
            <div class="avatar avatar_big avatar_centered avatar_profile">
                <img src="${this.props.url}" alt="avatar" class="">
            </div>
        `;
    }
}
