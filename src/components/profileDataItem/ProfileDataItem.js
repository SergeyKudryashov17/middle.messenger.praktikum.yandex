import Block from "../../core/Block";
import Field from "../field/Field";

import {handleValidateField, resetValidateField} from "../../utils/validation";

import './profileDataItem.css';

export default class ProfileDataItem extends Block {
    constructor(props) {
        if (props.isEditable) {
            props.field = new Field({
                fieldClass: props.fieldClass,
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

    render() {
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


