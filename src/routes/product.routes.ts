import { FastifyInstance } from "fastify";
import { jwtVerify } from "../middleware/jwt-verify";
import { ProductController } from "../controllers/product-controller";

const productController = new ProductController()

export function productRoutes(app: FastifyInstance)
{
  app.post('/product/create', {onRequest: [jwtVerify]}, (request, reply) => productController.create(request, reply))
}