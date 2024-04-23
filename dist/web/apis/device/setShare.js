export class SetShare {
    /**
     * Modify sharing permissions
     *
     * @param options - The device information.
     * @param options.deviceId - The device id.
     * @param options.apiKey - The user's apiKey.
     * @param options.permit - The sharing permissions.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async setShare(options) {
        const body = {
            deviceid: options.deviceId,
            apikey: options.apiKey,
            permit: options.permit
        };
        return await this.root.request.post("/v2/device/share/permit", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
