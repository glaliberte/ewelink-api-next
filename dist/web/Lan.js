import { Bonjour } from "bonjour-service";
import { creatRequest } from "../utils/request.js";
import CryptoJS from "crypto-js";
let _logger;
// let lanServerList: Service[] = []; // Service list 服务列表
// let lanServerDict: { [key: string]: Service } = {}; // Mapping table of device ID and service 设备ID与服务的映射表
export class Lan {
    constructor(options) {
        this.selfApikey = "";
        this.zeroconf = {
            // 单通道设备开关
            /**
             * Switch single channel device
             */
            switch: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/switch",
                    method: "post"
                });
            },
            // 多通道设备开关
            /**
             * Switch multiple channels
             */
            switches: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/switches",
                    method: "post"
                });
            },
            // 调节灯的颜色、亮度、色温
            /**
             * Adjust the color, brightness, color temperature of the light
             */
            dimmable: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/dimmable",
                    method: "post"
                });
            },
            // 网络指示灯开关
            /**
             * Switch network indicator light
             */
            sledOnline: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/sledonline",
                    method: "post"
                });
            },
            // 设备上电状态设置
            /**
             * Set device power on status
             */
            startups: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/startups",
                    method: "post"
                });
            },
            // 设备打开后自动关闭设置
            /**
             * Set device auto close after open
             */
            pulses: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/pulses",
                    method: "post"
                });
            },
            // 传输是否加密
            /**
             * Whether to encrypt the transmission
             */
            encrypt: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/encrypt",
                    method: "post"
                });
            },
            // 设置加密密码
            /**
             * Set encryption password
             */
            password: async (controlOptions) => {
                return await this.generalRequest({
                    ...controlOptions,
                    path: "/zeroconf/encrypt",
                    method: "post"
                });
            }
        };
        if (!options)
            return;
        _logger = this.logObj = options.logObj;
        this.request = options.request || creatRequest(undefined, this.logObj);
        this.selfApikey = options.selfApikey;
    }
    /**
     * Discover eWeLink devices in LAN
     *
     * @param onDiscover - callback function
     * @param type - default: ewelink
     * @returns bonjourClient - Bonjour Object
     *
     * @beta
     */
    discovery(onDiscover, type = "ewelink") {
        const bonjourClient = new Bonjour();
        bonjourClient.find({ type: type }, function (service) {
            if (_logger) {
                _logger.info("Found an eWeLink mDns server: ", service);
            }
            // lanServerList.push(service);
            // storage.set("lanServerList", lanServerList);
            // lanServerDict[service.txt.id] = service;
            // storage.set("lanServerDict", lanServerDict);
            onDiscover(service);
        });
        return bonjourClient;
    }
    // getLocalServerList() {
    //   if (_logger) {
    //     _logger.info("lanServerList:", lanServerList);
    //   }
    //   return lanServerList;
    // }
    // getLocalServerDict() {
    //   if (_logger) {
    //     _logger.info("lanServerDict:", lanServerDict);
    //   }
    //   return lanServerDict;
    // }
    /**
     * data encrypt
     *
     * @param data -  data
     * @param secretKey - secretKey
     * @param iv - iv
     * @returns encrypted data - encrypted data
     *
     * @beta
     */
    encrypt(data, secretKey, iv) {
        if (!data)
            return "";
        const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Hex.parse(secretKey), {
            iv: CryptoJS.enc.Base64.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return cipher.ciphertext.toString(CryptoJS.enc.Base64);
    }
    /**
     * data decrypt
     * @param data -  encrypted data
     * @param secretKey - secretKey
     * @param iv - iv
     * @returns decrypted data - decrypted data
     *
     * @beta
     */
    decrypt(data, secretKey, iv) {
        if (!data)
            return {};
        return JSON.parse(CryptoJS.AES.decrypt(data, CryptoJS.enc.Hex.parse(secretKey), {
            iv: CryptoJS.enc.Base64.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8));
    }
    /**
     * Obtain the device's IP and port from the service
     *
     * @param server
     * @return ip - ip
     * @return port - port
     *
     * @beta
     */
    getDeviceIpPort(server) {
        if (server && server?.addresses) {
            const addresses = server.addresses || [];
            const ips = addresses.filter((ip) => {
                if (ip.length <= 32) {
                    return {
                        ip: ip,
                        port: server.port || 8081
                    };
                }
            });
            if (ips.length > 0) {
                return {
                    ip: ips[0],
                    port: server.port || 8081
                };
            }
        }
        return {};
    }
    /**
     * General Request
     * @param serverOptions - serverOptions
     * @param serverOptions.method - Request method
     * @param serverOptions.ip - Device IP
     * @param serverOptions.port - Device port
     * @param serverOptions.path - Request path
     * @param serverOptions.deviceId - Device ID
     * @param serverOptions.data - Request data
     * @param serverOptions.encrypt - Whether to encrypt the request data
     * @param serverOptions.secretKey - Encryption password
     * @param serverOptions.iv - iv
     * @param serverOptions.selfApikey - selfApikey
     *
     * @returns response - Data returned by the device
     *
     * @beta
     */
    async generalRequest(serverOptions) {
        if (serverOptions.encrypt) {
            if (!serverOptions?.iv && !serverOptions?.secretKey) {
                return new Error("iv is required when encrypt is true");
            }
            serverOptions.data = this.encrypt(serverOptions.data, serverOptions.secretKey || "", serverOptions.iv || "");
        }
        const body = {
            deviceid: serverOptions.deviceId,
            sequence: new Date().getTime().toString(),
            selfApikey: serverOptions.selfApikey || this.selfApikey,
            iv: serverOptions.iv,
            encrypt: serverOptions.encrypt,
            data: !serverOptions.encrypt ? JSON.stringify(serverOptions.data) : serverOptions.data
        };
        try {
            let requestConfig = {
                url: `http://${serverOptions.ip}:${serverOptions.port}${serverOptions.path}`,
                method: serverOptions.method.toLowerCase()
            };
            if (["post", "put", "patch", "putForm", "patchForm", "postForm"].includes(serverOptions.method.toLowerCase())) {
                requestConfig["data"] = body;
            }
            else {
                requestConfig["params"] = body;
            }
            return await this.request.request(requestConfig);
        }
        catch (error) {
            if (_logger) {
                _logger.error(error);
            }
            throw new Error("Request error, please check the network, or the device not online.");
        }
    }
}
