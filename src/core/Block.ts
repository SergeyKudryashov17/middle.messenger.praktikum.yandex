import Handlebars from 'handlebars';
import EventBus from './EventBus';
import {v4 as makeUUID} from 'uuid';

type BlockMeta = {
    tagName: string,
    props: any
}

export default class Block<P = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: "flow:render",
        FLOW_CREADY: "flow:component-ready"
    } as const;

    private readonly _meta: BlockMeta;
    public _id;
    protected readonly props: P;
    eventBus;
    protected _element: HTMLElement | null = null;
    public children: {[id: string]: Block} = {};
    public propDisplay: string = 'block';


    public constructor(tagName:string = "div", propsAndChildren: P) {
        const { children, props } = this._getChildren(propsAndChildren);

        if (props.propDisplay) {
            this.propDisplay = props.propDisplay;
        }

        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this._id = makeUUID();

        this.props = this._makePropsProxy({ ...props, __id: this._id }) as P;

        this.eventBus = () => eventBus;

        this.children = children;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CREADY, this._componentReady.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    dispatchComponentReady() {
        this.eventBus().emit(Block.EVENTS.FLOW_CREADY);
    }

    private _componentReady() {
        this.componentReady();
    }

    componentReady() {}

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: P, newProps: P): boolean {
        return true;
    }

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props as {}, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        const fragment: DocumentFragment = this._compile();

        this._removeEvents();

        const newElement: HTMLElement = fragment.firstElementChild as HTMLElement;

        this._element?.replaceWith(newElement);
        this._element = newElement;

        this._element.dataset.id = this._id;

        this._addEvents();

        this.dispatchComponentReady();
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return '';
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    private _addEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    private _makePropsProxy(props: P) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props as object, {
            get(target: Record<string, any>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, any>, prop: string, value) {
                const oldTarget = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    private _getChildren(propsAndChildren: any): {children: any, props: any} {
        const children: Record<string, unknown> = {};
        const props: Record<string, unknown> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    private _compile(): DocumentFragment {
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

            stub.replaceWith(component.getContent() as HTMLElement);
        });

        return fragment.content;
    }

    show(): void {
        (this.getContent() as HTMLElement ).style.display = this.propDisplay;
    }

    hide(): void {
        (this.getContent() as HTMLElement ).style.display = "none";
    }
}
