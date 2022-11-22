import Block from "../../core/Block";
import Input from "../input/Input.js";
import Label from "../label/Label.js";
import ErrorText from "../errorText/ErrorText";

import './field.css';

export default class Field extends Block {
    constructor(props) {
        props.labelComponent = (props.labelText !== undefined)
            ? new Label({
                text: props.labelText,
                className: props.labelClass,
                attrFor: props.labelFor
            }) : '';

        props.inputComponent = new Input({
            type: props.inputType,
            ID: props.inputID,
            classes: props.inputClass,
            placeholder: props.inputPlacecholder,
            value: props.inputValue,
            name: props.inputName,
            validateRule: props.inputValidateRule,
            events: props.eventsInput
        });

        props.errorTextComponent = (props.errorText !== undefined)
            ? new ErrorText({
                text: props.errorText
            }) : '';

        super("div", {...props});
    }

    render() {
        return `
            <div class="field">
                {{{ labelComponent }}}
                {{{ inputComponent }}}
                {{{ errorTextComponent }}}
            </div>
        `;
    }
}