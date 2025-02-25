import { knex } from "../database";
import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdAndUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const session = request.cookies.sessionId;

  if (!session) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  const user = await knex("users").where({ session_id: session }).first();

  if(!user) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  request.user = user
}
