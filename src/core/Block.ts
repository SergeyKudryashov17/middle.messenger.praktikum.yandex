import Handlebars from 'handlebars';
import EventBus from './EventBus';
import {v4 as makeUUID} from 'uuid';

type BlockMeta = {
    tagName: string,
    props: any
}

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: "flow:render"
    } as const;

    private readonly _meta: BlockMeta;
    public _id;
    protected readonly props: any;
    eventBus;
    protected _element = null;
    public children: {[id: string]: Block} = {};


    public constructor(tagName:string = "div", propsAndChildren: any = {}) {
        const { children, props } = this._getChildren(propsAndChildren);

        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this._id = makeUUID();

        this.props = this._makePropsProxy({ ...props, __id: this._id });

        this.eventBus = () => eventBus;

        this.children = children;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount(oldProps: any = {}) {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: any, newProps: any) {
        const response:Boolean = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: any, newProps: any) {
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render(): void {
        const fragment: DocumentFragment = this._compile();

        this._removeEvents();

        const newElement = fragment.firstElementChild;

        this._element.replaceWith(newElement);
        this._element = newElement;

        this._element.dataset.id = this._id;

        this._addEvents();
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return '';
    }

    getContent(): HTMLElement {
        return this.element;
    }

    _addEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    _makePropsProxy(props: any): any {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
                return true;
            },
            deleteProperty(target, prop) {
                throw new Error('Нет доступа');
            }
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    _getChildren(propsAndChildren: any): {children: any, props: any} {
        const children: {} = {};
        const props: {} = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    _compile(): DocumentFragment {
        const fragment = document.createElement('template');
        const block = this.render();

        const propsAndStubs = { ...this.props };
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        const tmpl = Handlebars.compile(block);
        fragment.innerHTML = tmpl({...propsAndStubs});

        Object.values(this.children).forEach(component => {
            const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
            if (!stub) return;

            stub.replaceWith(component.getContent());
        });

        return fragment.content;
    }

    show(): void {
        this.getContent().style.display = "block";
    }

    hide(): void {
        this.getContent().style.display = "none";
    }
}