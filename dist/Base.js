import { creatRequest } from "./utils/request.js";
export class eWeLinkBase {
    // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
    // constructor is a special method that is used to create and initialize class objects, similar to the Python __init__ function
    constructor(options) {
        this.endpoint = "https://eu-apia.coolkit.cc";
        this.at = "";
        this.rt = "";
        this.account = "";
        this.userApiKey = "";
        /**
         * Set the URL for the request
         *
         * @param region - The region.
         * @returns null
         *
         * @beta
         */
        this.setUrl = (region) => {
            this.endpoint = `https://${region}-apia.coolkit.${["cn", "test"].includes(region) ? "cn" : "cc"}`;
            this.request.defaults.baseURL = this.endpoint;
        };
        /**
         * Set APPID and APP SECRET
         * @param appId - The APPID.
         * @param appSecret - The APP SECRET.
         * @returns null
         *
         * @beta
         */
        this.setAuthConfigs = (appId, appSecret) => {
            this.appId = appId;
            this.appSecret = appSecret;
        };
        if (!options)
            return;
        this.logObj = options.logObj;
        this.request =
            options.request ||
                creatRequest({
                    baseURL: this.endpoint,
                    timeout: 20000
                }, this.logObj);
        if (options.appId)
            this.appId = options.appId;
        if (options.appSecret)
            this.appSecret = options.appSecret;
        if (options.region) {
            this.endpoint = `https://${options.region}-apia.coolkit.${["cn", "test"].includes(options.region) ? "cn" : "cc"}`;
            this.region = options.region;
            this.request.defaults.baseURL = this.endpoint;
        }
    }
}
