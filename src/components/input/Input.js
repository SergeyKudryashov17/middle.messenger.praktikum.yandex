import Block from "../../core/Block";

import './input.css';

export default class Input extends Block {
    constructor(props) {
        super("input",{...props});
    }

    render() {
        const type = this.props.type ? this.props.type : '';
        const ID = this.props.id ? this.props.id : '';
        const classes = this.props.className ? this.props.className : '';
        const placeholder  = this.props.placeholder ? this.props.placeholder : '';
        const value = this.props.value ? this.props.value : '';
        const name = this.props.name ? this.props.name : '';
        const validateRule = this.props.validateRule ? this.props.validateRule : '';

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