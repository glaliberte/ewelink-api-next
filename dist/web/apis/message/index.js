import { applyMixins } from "../../../utils/index.js";
import { GetMessage } from "./getMessage.js";
export class Message {
    constructor(root) {
        this.root = root;
    }
}
applyMixins(Message, [GetMessage]);
