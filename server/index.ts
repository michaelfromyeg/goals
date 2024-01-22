import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import Fastify from "fastify";

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

const fastify: FastifyInstance = Fastify({ logger: true });

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
    },
  },
};

fastify.get("/", opts, async (request, reply) => {
  return { hello: "world" };
});

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ host: HOST, port: PORT });
    console.log(`Server listening on ${fastify.server.address()}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
