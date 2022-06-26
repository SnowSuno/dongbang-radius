import {RadiusServer} from "radius-server";
import {SparcsLDAPAuth} from "./auth.js";
import {logger} from "./logger.js";

const server = new RadiusServer({
    authentication: new SparcsLDAPAuth(logger),
    secret: process.env.RADIUS_SECRET || "pesudo-secret",
    tlsOptions: {
        sessionTimeout: 10000,
    },
    logger: logger,
})

await server.start();
