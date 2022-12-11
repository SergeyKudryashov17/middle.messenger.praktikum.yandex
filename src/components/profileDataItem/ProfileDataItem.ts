import Block from "../../core/Block";
import Field from "../field/Field";

import './profileDataItem.css';

export default class ProfileDataItem extends Block {
    constructor(props: any) {
        if (props.isEditable) {
            props.field = new Field({
                fieldClass: props.fieldClass,
                inputName: props.inputName,
                inputType: props.typeValue,
                inputValue: props.value,
                inputClass: 'input_simple input_right',
                inputValidateRule: props.validateRule ?? '',
                errorText: '',
                eventsInput: props.eventsField ?? {}
            });
        }

        super("a", {...props});
    }

    render(): string {
        return `
            <div class="profile-data">
                <div class="profile-data__label">${this.props.label}</div>
                <div class="profile-data__value">
                    ${ this.props.isEditable ? '{{{ field }}}' : this.props.value }
                </div>
            </div>
        `;
    }
}
