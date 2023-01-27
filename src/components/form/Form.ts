import Block from "../../core/Block";

interface IFormProps {
    title?: string;
    className?: string;
    fields: Block[];
    controls: Block[];
    events?: Record<string, Function>;
}

export default class Form extends Block {
    constructor(props: IFormProps) {
        super("form", { ...props });
    }

    render() {
        const title = this.props.title ? `<div class="form__title">${this.props.title}</div>` : "";

        return `
      <form class="${this.props.className}">
        ${title}
        <div class="form__fields">
          {{#each fields}}
            {{{this}}}
          {{/each}}
        </div>
        <div class="form__footer">
          {{#each controls}}
            {{{this}}}
          {{/each}}
        </div>
      </form>
    `;
    }
}
