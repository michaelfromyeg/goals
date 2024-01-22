import type { FastifyInstance, FastifyRequest } from "fastify";
import multer from "fastify-multer";
import { v4 as uuidv4 } from "uuid";

const upload = multer({ storage: multer.memoryStorage() });

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

interface MulterRequest extends FastifyRequest {
  file: Express.Multer.File;
}

const goalsDB: Record<string, Goal> = {};
const daysDB: Record<string, Day[]> = {};

export function registerGoalsRoutes(fastify: FastifyInstance) {
  fastify.post("/goals", async (request, reply) => {
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
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  fastify.patch<{ Params: GoalParams }>(
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
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  fastify.get<{ Params: GoalParams }>(
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
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  fastify.post<{ Params: GoalParams }>(
    "/goals/:goalid/days",
    { preHandler: upload.single("photo") },
    async (request, reply) => {
      try {
        const multerReq = request as MulterRequest;

        const { goalid } = request.params;
        const { user } = request.body as any; // Define the correct type
        const datetime = new Date();
        const photo: string = multerReq.file.filename; // Handle file data

        const newDay: Day = {
          goalid,
          user,
          datetime,
          photo,
        };

        if (!daysDB[goalid]) {
          daysDB[goalid] = [];
        }

        daysDB[goalid].push(newDay);

        reply.status(201).send(newDay);
      } catch (error) {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  fastify.get<{ Params: GoalParams }>(
    "/goals/:goalid/days",
    async (request, reply) => {
      try {
        const { goalid } = request.params;
        const days = daysDB[goalid] || [];

        reply.status(200).send(days);
      } catch (error) {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );
}
