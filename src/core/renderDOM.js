export default function renderDOM(selector, block) {
    const root = document.querySelector(selector);

    root.innerHTML = '';
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return root;
}