export class GetThingStatus {
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
    async getThingStatus(options) {
        if (typeof options.type === "string") {
            options.type = options.type === "device" ? 1 : 2;
        }
        const params = {
            type: options.type || 1,
            id: options.id,
            params: options?.params
        };
        return await this.root.request.get("/v2/device/thing/status", {
            params: params,
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
