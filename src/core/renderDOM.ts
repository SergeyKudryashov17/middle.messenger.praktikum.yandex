import Block from "./Block";

export default function renderDOM(selector: string, block: Block): HTMLElement | null {
    const root: HTMLElement | null = document.querySelector(selector);

    if (!root) return null;

    root.innerHTML = '';
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return root;
}
