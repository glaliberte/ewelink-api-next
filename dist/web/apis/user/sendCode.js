import { sign } from "../../../utils/index.js";
export class SendCode {
    /**
     * Send Verification Code
     * @description Send verification code to email or phone number.
     *
     * @param options - The account information.
     * @param options.type - The type of Verification code
     * @param options.account - The account.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async sendCode(options) {
        const codeTypes = {
            register: 0,
            resetPwd: 1,
            logout: 3,
            SMSLogin: 4
        };
        const body = {
            type: options.type || 0
        };
        body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}`] = options.account;
        if (typeof options.type === "string" && options.type in codeTypes) {
            body["type"] = codeTypes[options.type];
        }
        return await this.root.request.post("/v2/user/verification-code", body, {
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
            }
        });
    }
}
