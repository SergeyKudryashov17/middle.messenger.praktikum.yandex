import Block from "../core/Block";

export interface BlockConstructable<P extends Record<string, any> = any>{ new (props: P): Block<P> }
