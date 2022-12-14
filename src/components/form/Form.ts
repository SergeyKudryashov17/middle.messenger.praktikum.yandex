import Block from '../../core/Block';

interface IFormProps {
  title?: string,
  className?: string,
  fields: Block[],
  controls: Block[],
  events?: Record<string, Function>
}

export default class Form extends Block {
  fieldsList: string = '';
  controlsList: string = '';

  constructor(props: IFormProps) {
    props.fieldsList = '';
    props.fields.forEach((component: Block, index: number) => {
      props.fieldsList += `{{{ field${index} }}}`;
      props[`field${index}`] = component;
    });

    props.controlsList = '';
    props.controls.forEach((component: Block, index: number) => {
      props.controlsList += `{{{ control${index} }}}`;
      props[`control${index}`] = component;
    });

    super("form", { ...props});
  }

  render() {
    const title = this.props.title ? `<div class="form__title">${this.props.title}</div>` : '';

    return `
      <form class="${this.props.className}">
        ${title}
        <div class="form__fields">
          ${this.props.fieldsList}
        </div>
        <div class="form__footer">
          ${this.props.controlsList}
        </div>
      </form>
    `;
  }
}
