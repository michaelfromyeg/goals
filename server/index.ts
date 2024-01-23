import fastifyMultipart from "@fastify/multipart";
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";
import Fastify from "fastify";
import admin from "firebase-admin";
import fs from "fs";
import type { AddressInfo } from "node:net";
import path from "path";
import goals from "./goals.js";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT || "";
if (!FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
}

const serviceAccount = JSON.parse(
  Buffer.from(FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf-8"),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const fastify: FastifyInstance = Fastify({ logger: true });

fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

if (!process.env.PHOTOS_PATH) {
  throw new Error("PHOTOS_PATH not set");
}

fastify.decorate("config", {
  PORT: process.env.PORT || "3000",
  HOST: process.env.HOST || "localhost",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
  FIREBASE_SERVICE_ACCOUNT: FIREBASE_SERVICE_ACCOUNT,
  PHOTOS_DIR: path.join(process.cwd(), process.env.PHOTOS_PATH),
});

if (!fs.existsSync(fastify.config.PHOTOS_DIR)) {
  fs.mkdirSync(fastify.config.PHOTOS_DIR, { recursive: true });
}

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
        },
      },
    },
  },
};

fastify.get("/", opts, async (request: any, reply: any) => {
  return { status: "up" };
});

// TODO(michaelfromyeg): add correct types; move
fastify.post(
  "/notify",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { token, title, body } = request.body as any;

    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
    };

    try {
      const response = await admin.messaging().send(message);
      reply.status(200).send(`Successfully sent message: ${response}`);
    } catch (error) {
      console.error(error);
      reply.status(500).send(`Error sending message: ${error}`);
    }
  },
);

const toString = (address: AddressInfo): string => {
  return `${address.address}:${address.port}`;
};

fastify.register(goals);

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ host: HOST, port: PORT });
    console.log(
      `Server listening on ${toString(fastify.server.address() as AddressInfo)}`,
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
