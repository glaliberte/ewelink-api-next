import { BaseWebAPI } from "../../WebAPI.js";
export type thingInfo = {
    type?: number | string | 1 | 2 | "device" | "group";
    id: string;
    params?: string;
};
export interface GetThingStatus extends BaseWebAPI {
}
export declare class GetThingStatus {
    /**
     * Get Device Status
     *
     * @param options - The things information.
     * @param options.type - The things type. 1: devices status, 2: groups status.
     * @param options.id - The things id.
     * @param options.params - option, The things params.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getThingStatus(options: thingInfo): Promise<any>;
}
