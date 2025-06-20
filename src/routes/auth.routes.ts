import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth-controller";

const authController = new AuthController()

export function authRoutes(app: FastifyInstance)
{
  app.post('/login', (request, reply) => authController.login(request, reply))
}