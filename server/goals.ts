import fastifyStatic from "@fastify/static";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

interface Goal {
  goalid: string;
  userA: string;
  userB: string | null;
  userAGoal: string;
  userBGoal: string | null;
  buyIn: number;
  reminder: { hour: number; minute: number };
  startDate: Date;
  endDate: Date;
}

interface GoalParams {
  goalid: string;
}

interface Day {
  goalid: string;
  user: string;
  datetime: Date;
  photo: string;
}

const goalsDB: Record<string, Goal> = {};
const daysDB: Record<string, Day[]> = {};

const goals = async (server: FastifyInstance, opts: any) => {
  server.post("/goals", async (request, reply) => {
    try {
      const { userA, userAGoal, buyIn, reminder, startDate, endDate } =
        request.body as any; // Define the correct type
      const goalid = uuidv4();

      const newGoal: Goal = {
        goalid,
        userA,
        userAGoal,
        buyIn,
        reminder,
        startDate,
        endDate,
        userB: null,
        userBGoal: null,
      };

      goalsDB[goalid] = newGoal;

      reply.status(201).send(newGoal);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  server.patch<{ Params: GoalParams }>(
    "/goals/:goalid",
    async (request, reply) => {
      try {
        const { goalid } = request.params;
        const { userB, userBGoal } = request.body as any; // Define the correct type

        const goal = goalsDB[goalid];

        if (!goal) {
          return reply.status(404).send({ error: "Goal not found" });
        }

        if (goal.userB !== null) {
          return reply
            .status(400)
            .send({ error: "UserB is already set for this goal" });
        }

        goal.userB = userB;
        goal.userBGoal = userBGoal;

        reply.status(200).send(goal);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  server.get<{ Params: GoalParams }>(
    "/goals/:goalid",
    async (request, reply) => {
      try {
        const { goalid } = request.params;
        const goal = goalsDB[goalid];

        if (!goal) {
          return reply.status(404).send({ error: "Goal not found" });
        }

        reply.status(200).send(goal);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  server.post<{ Params: GoalParams }>(
    "/goals/:goalid/days",
    async (request, reply) => {
      const data = await request.file();
      if (!data) {
        return reply.status(400).send({ error: "No file provided" });
      }
      if (data.mimetype !== "image/jpeg") {
        return reply.status(400).send({ error: "Invalid file type" });
      }
      if (!data.fields.user) {
        return reply.status(400).send({ error: "No user provided" });
      }

      const { goalid } = request.params;
      const datetime = new Date();

      const filename = `${uuidv4()}.jpg`;

      const buffer = await data.toBuffer();
      try {
        await fs.writeFile(
          `${server.config.PHOTOS_DIR}/${filename}`,
          buffer,
          "binary",
        );
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal Server Error" });
      }

      const newDay: Day = {
        goalid,
        user: (data.fields.user as any).value,
        datetime,
        photo: filename,
      };

      if (!daysDB[goalid]) {
        daysDB[goalid] = [];
      }

      daysDB[goalid].push(newDay);

      reply.status(201).send(newDay);
    },
  );

  server.register(fastifyStatic, {
    root: server.config.PHOTOS_DIR,
    prefix: "/photos/",
  });

  server.get<{ Params: GoalParams }>(
    "/goals/:goalid/days",
    async (request, reply) => {
      try {
        const { goalid } = request.params;
        const days = daysDB[goalid] || [];

        reply.status(200).send(days);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );
};

export default fp(goals);
