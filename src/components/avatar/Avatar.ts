import Block from "../../core/Block";
import Input from "../input/Input";
import Label from "../label/Label";

import imageUrl from "../../static/icon/Union.png";
import "./avatar.css";

interface IAvatarProps {
    isEdit?: boolean;
    inputImg?: Input;
    inputLabel?: Label;
    url: string;
    events?: Record<string, Function>;
}

export default class Avatar extends Block {
    constructor(props: IAvatarProps) {
        props.inputImg = new Input({
            type: "file",
            id: "input_avatar",
            events: {
                change: (event: Event) => props.events?.change(event),
            },
        });
        props.inputLabel = new Label({
            attrFor: "input_avatar",
            className: "avatar__label",
        });
        super("a", { ...props });
    }

    render(): string {
        const avatarSrc = this.props.url || imageUrl;
        const avatarClass = this.props.url !== "" ? "avatar__img" : "";

        if (this.props.isEdit) {
            return `
                <div class="avatar avatar_big avatar_centered avatar_edit">
                    <img class="${avatarClass}" src="${avatarSrc}" alt="avatar" class="">
                    {{{ inputImg }}}
                    {{{ inputLabel }}}
                </div>
            `;
        }
        return `
                <div class="avatar avatar_big avatar_centered">
                    <img class="${avatarClass}" src="${avatarSrc}" alt="avatar" class="">
                </div>
            `;
    }
}
