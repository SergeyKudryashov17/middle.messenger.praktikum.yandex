import Block from "../../core/Block";

import './input.css';

interface IInputProps {
    type?: string,
    id?: string,
    className?: string,
    placeholder?: string,
    value?: string,
    name?: string,
    validateRule?: string,
    events?: Record<string, Function>
}

export default class Input extends Block {
    constructor(props: IInputProps) {
        super("input",{...props});
    }

    render(): string {
        const type: string = this.props.type ? this.props.type : '';
        const ID: string = this.props.id ? this.props.id : '';
        const classes: string = this.props.className ? this.props.className : '';
        const placeholder: string  = this.props.placeholder ? this.props.placeholder : '';
        const value: string = this.props.value ? this.props.value : '';
        const name: string = this.props.name ? this.props.name : '';
        const validateRule: string = this.props.validateRule ? this.props.validateRule : '';

        return `<input type="${type}"
                       id="${ID}"
                       class="input input_${type} ${classes}"
                       placeholder="${placeholder}"
                       value="${value}"
                       name="${name}"
                       validateRule="${validateRule}"
                       >`;
    }
}
