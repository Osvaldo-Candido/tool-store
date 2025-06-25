import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/category-controller";
import { jwtVerify } from "../middleware/jwt-verify";

const categoryController = new CategoryController()

export function categoryRoutes(app: FastifyInstance)
{
  app.post('/category/create', {onRequest: [jwtVerify]}, (request, reply) => categoryController.create(request, reply))
  app.get('/category', (request, reply) => categoryController.index(reply))
  app.get('/category/:id', (request, reply) => categoryController.show(request, reply))
}