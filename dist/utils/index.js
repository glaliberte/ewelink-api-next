import { createHmac, createHash } from "crypto";
// 混合模式，将其他类的方法添加到 derivedCtor 类的原型上。
// Mixed mode, adding methods of other classes to the prototype of derivedCtor class.
export const applyMixins = (derivedCtor, constructors) => {
    constructors.forEach((baseCtor) => {
        // 获取baseCtor的属性名称，循环输出
        // Get the attribute name of baseCtor and output circularly
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            // 定义属性
            // Define property
            Object.defineProperty(derivedCtor.prototype, name, 
            // 获取自己的属性描述符
            // Get the description of the property of the own
            Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
};
// Random {size}-digit alphanumeric
export const nonce = (size = 8) => Math.random().toString(36).slice(-size);
/**
 * Hmac-Sha256 Sign
 *
 * @param {string} msg - Message to be signed
 * @param {string} appSecret - App secret
 * @param {number=} isFormat - Message Type, true: such as 'a=1&b=2'；false: Original object
 * @return {Object} sign - Signed message
 */
export const sign = (msg, appSecret, isFormat = false) => {
    // URLSearchParams will encode characters, resulting in inconsistent signature content
    let buffer;
    if (isFormat && typeof msg === "object") {
        buffer = Object.keys(msg)
            .map((key) => `${key}=${msg[key]}`)
            .join("&");
    }
    else if (typeof msg === "object") {
        buffer = JSON.stringify(msg);
    }
    else {
        buffer = msg;
    }
    return createHmac("sha256", appSecret).update(buffer).digest("base64");
};
/**
 * Hash-Sha256 Sign
 *
 * @param {string} str - Message to be signed
 * @return {Object} sign - Signed message
 */
export const hashSha256 = (str) => {
    return createHash("sha256").update(str).digest("hex");
};
/**
 * Save the token to local storage
 *
 * @param {string} res - Axios response data
 * @param {string} account - Account name
 * @return {Object} None
 */
// export const saveToken = (res: any, account: string) => {
//   let valueObj = storage.get(res.data.region);
//   let value = {
//     [account]: {
//       at: res.data.at,
//       rt: res.data.rt,
//       user: res.data.user,
//       createTime: dayjs().format(),
//       expireTime: dayjs().add(30, "day").format()
//     }
//   };
//   if (valueObj && valueObj[Object.keys(value)[0]]) {
//     valueObj[Object.keys(value)[0]] = value[Object.keys(value)[0]];
//   } else {
//     valueObj = value;
//   }
//   storage.set(res.data.region, valueObj);
// };
/**
 * Get the token to local storage
 *
 * @param {string} region - Region
 * @param {string} account - Account name
 * @return {Object} token - Token
 */
// export const getToken = (region: string, account: string): string => {
//   const valueObj = storage.get(region) || {};
//   if (valueObj[account]) {
//     return valueObj[account].at;
//   }
//   return "";
// };
