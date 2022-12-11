import Block from "../../core/Block";
import Input from "../input/Input";
import Label from "../label/Label";
import ErrorText from "../errorText/ErrorText";

import './field.css';

export default class Field extends Block {
    constructor(props: any) {
        props.labelComponent = (props.labelText !== undefined)
            ? new Label({
                text: props.labelText,
                className: props.labelClass,
                attrFor: props.labelFor
            }) : '';

        props.inputComponent = new Input({
            type: props.inputType,
            ID: props.inputID,
            className: props.inputClass,
            placeholder: props.inputPlacecholder,
            value: props.inputValue,
            name: props.inputName,
            validateRule: props.inputValidateRule,
            events: props.eventsInput
        });

        props.errorTextComponent = (props.errorText !== undefined)
            ? new ErrorText({
                className: props.className,
                text: props.errorText
            }) : '';

        super("div", {...props});
    }

    render(): string {
        return `
            <div class="field ${this.props.fieldClass}">
                {{{ labelComponent }}}
                {{{ inputComponent }}}
                {{{ errorTextComponent }}}
            </div>
        `;
    }
}
