import Block from "../../core/Block";

import './avatar.css';
import Input from "../input/Input";
import Label from "../label/Label";

interface IAvatarProps {
    isEdit?: boolean,
    inputImg?: Input,
    inputLabel?: Label,
    url: string,
    events?: Record<string, Function>
}

export default class Avatar extends Block {
    constructor(props: IAvatarProps) {
        props.inputImg = new Input({
            type: 'file',
            id: 'input_avatar',
            events: {
                change: (event: Event) => props.events?.change(event)
            }
        });
        props.inputLabel = new Label({
            attrFor: 'input_avatar',
            className: 'avatar__label'
        });
        super("a", {...props});
    }

    render(): string {
        if (this.props.isEdit) {
            return `
                <div class="avatar avatar_big avatar_centered avatar_edit">
                    <img class="avatar__img" src="${this.props.url}" alt="avatar" class="">
                    {{{ inputImg }}}
                    {{{ inputLabel }}}
                </div>
            `;
        } else {
            return `
                <div class="avatar avatar_big avatar_centered">
                    <img class="avatar__img" src="${this.props.url}" alt="avatar" class="">
                </div>
            `;
        }
    }
}
