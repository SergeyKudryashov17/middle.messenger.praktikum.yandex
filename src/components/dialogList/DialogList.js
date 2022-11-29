import Block from '../../core/Block.js';
import DialogItem from "../dialogItem/DialogItem";

export default class DialogList extends Block {
    constructor(props) {
        let componentLabel = '';
        props.dialogComponentsLabels = '';
        props.dialogsData.forEach((data, index) => {
            componentLabel = `dialog${index}`;
            props.dialogComponentsLabels += `{{{ ${componentLabel} }}}`;
            props[componentLabel] = new DialogItem(data);
        });

        super("div", {...props});
    }

    render() {
        return `<ul class="dialog-list">${this.props.dialogComponentsLabels}</ul>`;
    }
}