import { applyMixins } from "../../../utils/index.js";
import { Dispatch } from "./dispatch.js";
export class Other {
    constructor(root) {
        this.root = root;
    }
}
applyMixins(Other, [Dispatch]);
