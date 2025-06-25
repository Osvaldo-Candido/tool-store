import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user-controller";

const userController = new UserController()

export function userRoutes(app: FastifyInstance) {
  app.post('/user',(request, reply) => userController.create(request, reply))
}