import { AxiosInstance } from "axios";
export type eWeLinkBaseOptions = {
    appId: string;
    appSecret: string;
    region: string;
    logObj?: any;
    request?: any;
};
export declare class eWeLinkBase {
    appId?: string;
    appSecret?: string;
    region?: string;
    endpoint: string;
    at: string;
    rt: string;
    account: string;
    userApiKey: string;
    logObj?: any;
    request: AxiosInstance | any;
    constructor(options?: eWeLinkBaseOptions);
    /**
     * Set the URL for the request
     *
     * @param region - The region.
     * @returns null
     *
     * @beta
     */
    setUrl: (region: string) => void;
    /**
     * Set APPID and APP SECRET
     * @param appId - The APPID.
     * @param appSecret - The APP SECRET.
     * @returns null
     *
     * @beta
     */
    setAuthConfigs: (appId: string, appSecret: string) => void;
}
export interface eWeLinkBase {
}
