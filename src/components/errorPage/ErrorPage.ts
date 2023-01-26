import Block from "../../core/Block";

interface IErrorPageProps {
    title: string;
    caption: string;
    link?: Block;
    propDisplay?: string;
    events?: Record<string, Function>;
}

export default class ErrorPage extends Block {
    typeBody: string;

    constructor(props: IErrorPageProps) {
        super("div", { ...props });
    }

    render(): string {
        this.typeBody = this.props.typeBody ? `messenger-body_${this.props.typeBody}` : "";

        return `
            <main class="messenger-container">
                <div class="messenger-body messenger-body_default">
                    <h1>${this.props.title}</h1>
                    <h2>${this.props.caption}</h2>
                    {{{ link }}}
                </div>
            </main>
        `;
    }
}
