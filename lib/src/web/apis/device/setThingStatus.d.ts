import { BaseWebAPI } from "../../WebAPI.js";
export type thingInfo = {
    type?: number | string | 1 | 2 | "device" | "group";
    id: string;
    params: object;
};
export interface SetThingStatus extends BaseWebAPI {
}
export declare class SetThingStatus {
    /**
     * Update the status of individual devices or groups
     *
     * @param options - The things information.
     * @param options.type - The things type. 1: devices status, 2: groups status.
     * @param options.id - The things id.
     * @param options.params - The things params.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setThingStatus(options: thingInfo): Promise<any>;
}
