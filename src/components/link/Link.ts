import Block from "../../core/Block";
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

import './link.css';
import '../button/button.css';


interface ILinkProps extends PropsWithRouter {
    href: string,
    label: string,
    className?: string
    dataset?: Record<string, string>,
    events?: Record<string, Function>
}

export class BaseLink extends Block<ILinkProps> {
    constructor(props: ILinkProps) {
        super("a", {
            ...props,
            events: {
                click: (event: Event) => this.navigate(event)
            }
        });
    }

    navigate(event: Event) {
        event.preventDefault();
        this.props.router.go(this.props.href);
    }

    render(): string {
        let dataAttributes: string = '';
        for (let keyAttr in this.props.dataset) {
            dataAttributes += `data-${keyAttr}="${this.props.dataset[keyAttr]}" `;
        }

        return `<a href="{{href}}" class="link {{className}}" ${dataAttributes}>${this.props.label}</a>`;
    }
}

export default withRouter(BaseLink);
