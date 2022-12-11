import Block from "./Block";

export default function renderDOM(selector: string, block: Block): HTMLElement {
    const root: HTMLElement = document.querySelector(selector);

    root.innerHTML = '';
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return root;
}
