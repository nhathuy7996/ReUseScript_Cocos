import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Singleton')
export class Singleton<T extends Component> extends Component {
    private static instance: any;

      
    protected constructor() {
        super();
    }

    public static getInstance<T>(): T {
        if (!this.instance) {
            this.instance = new this();       }

        return this.instance as T ;
    } 
}

