import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from "fastify";
import Fastify from "fastify";
import admin from "firebase-admin";
import type { AddressInfo } from "node:net";
import { registerGoalsRoutes } from "./goals";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT || "";
const serviceAccount = JSON.parse(
  Buffer.from(FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf-8"),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const fastify: FastifyInstance = Fastify({ logger: true });

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

fastify.get("/", opts, async (request, reply) => {
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
      reply.status(500).send(`Error sending message: ${error}`);
    }
  },
);

registerGoalsRoutes(fastify);

const toString = (address: AddressInfo): string => {
  return `${address.address}:${address.port}`;
};

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
