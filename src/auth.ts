import {IAuthentication} from "radius-server/dist/interfaces/Authentication.js";
import {ILogger} from "radius-server/dist/interfaces/Logger.js";
import {Client, InvalidCredentialsError} from "ldapts";


export class SparcsLDAPAuth implements IAuthentication {
    private ldap: Client;
    private logger: ILogger;
    
    constructor(logger: ILogger) {
        this.logger = logger;
        this.ldap = new Client({
            url: 'ldap://ldap.sparcs.org',
            timeout: 0,
            connectTimeout: 2000,
            strictDN: true,
        });
    }
    
    async authenticate(username: string, password: string): Promise<boolean> {
        try {
            await this.ldap.bind(
                `uid=${sanitize(username)},ou=People,dc=sparcs,dc=org`,
                password,
            );
            await this.ldap.unbind();
        } catch (e) {
            if (e instanceof InvalidCredentialsError) {
                this.logger.log("LDAP", `Authentication failed for ${username}`);
            } else {
                this.logger.error("LDAP", e);
            }
            return false;
        }
        
        this.logger.log("LDAP", `Authentication succeeded for ${username}`);
        return true;
    };
}


const sanitize = (string: string): string => {
    if (!/^\w*$/.test(string)) throw new InvalidCredentialsError("Disallowed character");
    return string;
}
