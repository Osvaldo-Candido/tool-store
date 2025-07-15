import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/order-controller";
import { jwtVerify } from "../middleware/jwt-verify";

const orderController = new OrderController()

export function OrderRoutes(app: FastifyInstance)
{
  app.post('/order/create', {onRequest: [jwtVerify]}, (request, reply) => orderController.create(request, reply))
  app.get('/order/show', {onRequest: [jwtVerify]}, (request, reply) => orderController.show(request, reply))
  app.get('/order/showorders/:id', {onRequest: [jwtVerify]}, (request, reply) => orderController.showById(request, reply))
}