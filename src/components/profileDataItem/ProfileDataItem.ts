import Block from "../../core/Block";
import Field from "../field/Field";

import "./profileDataItem.css";

interface IProfileDataItem {
    className?: string;
    label: string;
    isEditable?: boolean;
    fieldClass?: string;
    inputID?: string;
    inputName?: string;
    typeValue?: string;
    value: string;
    validateRule?: string;
    eventsField?: Record<string, Function>;
    field?: Field;
}

export default class ProfileDataItem extends Block {
    constructor(props: IProfileDataItem) {
        if (props.isEditable) {
            props.field = new Field({
                fieldClass: props.fieldClass,
                inputID: props.inputID,
                inputName: props.inputName,
                inputType: props.typeValue,
                inputValue: props.value,
                inputClass: "input_simple input_right",
                inputValidateRule: props.validateRule ?? "",
                errorText: "",
                eventsInput: props.eventsField ?? {},
            });
        }
        super("a", { ...props });
    }

    render(): string {
        return `
            <div class="profile-data ${this.props.className || ""}">
                <div class="profile-data__label">${this.props.label}</div>
                <div class="profile-data__value">
                    ${this.props.isEditable ? "{{{ field }}}" : this.props.value}
                </div>
            </div>
        `;
    }
}
