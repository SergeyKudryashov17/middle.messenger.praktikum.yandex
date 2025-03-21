import Block from "../../core/Block";
import Input from "../input/Input";
import Label from "../label/Label";
import ErrorText from "../errorText/ErrorText";

import "./field.css";

interface IFieldProps {
    fieldClass?: string;
    labelText?: string;
    labelClass?: string;
    labelFor?: string;
    inputType?: string;
    inputID?: string;
    inputClass?: string;
    inputPlaceholder?: string;
    inputValue?: string;
    inputName?: string;
    inputValidateRule?: string;
    eventsInput?: Record<string, Function>;
    errorText: string;
    events?: Record<string, Function>;
    labelComponent?: Label | "";
    inputComponent?: Input | "";
    errorTextComponent?: ErrorText | "";
    className?: string;
}

export default class Field extends Block {
    constructor(props: IFieldProps) {
        props.labelComponent =
            props.labelText !== undefined
                ? new Label({
                      text: props.labelText,
                      className: props.labelClass,
                      attrFor: props.labelFor,
                  })
                : "";

        props.inputComponent = new Input({
            type: props.inputType,
            id: props.inputID,
            className: props.inputClass,
            placeholder: props.inputPlaceholder,
            value: props.inputValue,
            name: props.inputName,
            validateRule: props.inputValidateRule,
            events: props.eventsInput,
        });

        props.errorTextComponent =
            props.errorText !== undefined
                ? new ErrorText({
                      className: props.className,
                      text: props.errorText,
                  })
                : "";

        super("div", { ...props });
    }

    componentDidUpdate(_oldProps: any, newProps: any): boolean {
        this.children.inputComponent.setProps({ value: newProps.inputValue });
        return true;
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
