import Block from '../../core/Block';
import DialogItem from "../dialogItem/DialogItem";

export default class DialogList extends Block {
    constructor(props: any) {
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
