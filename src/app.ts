import {RadiusServer} from "radius-server";
import {logger} from "./logger.js";
import {PsudoAuth} from "./test.js";

const server = new RadiusServer({
    authentication: new PsudoAuth(),
    secret: process.env.RADIUS_SECRET || "pesudo-secret",
    tlsOptions: {
        sessionTimeout: 10000,
    },
    logger: logger,
})

await server.start();
