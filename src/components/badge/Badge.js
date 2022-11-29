import Block from '../../core/Block.js';

import './badge.css';

export default class Badge extends Block {
    constructor(props) {
        super("li", {...props});
    }

    render() {
        return `<div class="badge">${this.props.value}</div>`;
    }
}