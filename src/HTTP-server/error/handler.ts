import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "./types";

function errorHandler(error: any, req: FastifyRequest, reply: FastifyReply) {
  req.log.error(error);

  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({ message: error.message });
  }

  if ("validation" in error && error.validation) {
    const field = error.validation[0].instancePath.slice(1);
    let rule: string = "uknown";

    if (error.validation[0].keyword === "required") {
      rule = "is required.";
    }
    if (error.validation[0].keyword === "type") {
      rule = "must be a string.";
    }
    if (error.validation[0].keyword === "minLength") {
      rule = "is too short.";
    }
    if (error.validation[0].keyword === "maxLength") {
      rule = "is too long.";
    }
    if (error.validation[0].keyword === "format") {
      rule = "has an invalid format.";
    }

    return reply.code(400).send({ message: `${field} ${rule}` });
  }

  if ("statusCode" in error && typeof error.statusCode === "number") {
    return reply.code(error.statusCode).send({ message: error.message });
  }

  return reply.code(500).send({ message: "Internal server error" });
}

export default errorHandler;
