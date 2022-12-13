import Block from '../../core/Block';
import DialogItem from "../dialogItem/DialogItem";

export type dialogsData = {
    name: string,
    time: string,
    isMyMessage: boolean,
    preview: string,
    unread: number
}

interface IDialogListProps {
    dialogsData: dialogsData[]
}

export default class DialogList extends Block {
    constructor(props: IDialogListProps) {
        let componentLabel: string = '';
        props.dialogComponentsLabels = '';
        props.dialogsData.forEach((data, index) => {
            componentLabel = `dialog${index}`;
            props.dialogComponentsLabels += `{{{ ${componentLabel} }}}`;
            props[componentLabel] = new DialogItem(data);
        });

        super("div", {...props});
    }

    render(): string {
        return `<ul class="dialog-list">${this.props.dialogComponentsLabels}</ul>`;
    }
}
