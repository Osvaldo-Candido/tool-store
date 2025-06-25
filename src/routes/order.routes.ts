import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/order-controller";
import { jwtVerify } from "../middleware/jwt-verify";

const orderController = new OrderController()

export function OrderRoutes(app: FastifyInstance)
{
  app.post('/order/create', {onRequest: [jwtVerify]}, (request, reply) => orderController.create(request, reply))
}