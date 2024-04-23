import { eWeLinkBase } from "../Base.js";
import { Connect } from "./wss/index.js";
export class BaseWsAPI {
    // 创建一个私有只读的 root 属性，用于存储实例化的对象
    // Create a private read-only root attribute to store the instantiated object
    constructor(root) {
        this.root = root;
    }
}
export class Ws extends eWeLinkBase {
    constructor() {
        super(...arguments);
        // WebSocket服务
        // WebSocket service
        this.Connect = new Connect(this);
    }
}
