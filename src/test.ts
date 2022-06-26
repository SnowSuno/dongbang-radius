import {IAuthentication} from "radius-server/dist/interfaces/Authentication.js";


export class PsudoAuth implements IAuthentication {
    async authenticate(username: string, password: string): Promise<boolean> {
        return username === "admin" && password === "admin";
    }
}
