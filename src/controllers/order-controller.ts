import { FastifyReply, FastifyRequest } from "fastify"
import z from 'zod'
import { orderCreateFactory } from "../factories/order/order-create-factory"
import { orderListFactory } from "../factories/order/order-list-by-user-id-factory"
import { orderListByIdFactory } from "../factories/order/order-list-by-id"

const orderSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number()
})

export class OrderController {
  async create(request: FastifyRequest, reply: FastifyReply)
  {
    const {items} = request.body as {items: Array<{productId: string, quantity: number}>}
    console.log(items)
    try {
      const userId = request.user.sub
      const order = await orderCreateFactory().
      execute({
        items, 
        total: 0, 
        status: 'SHIPPED',
        userId
      }, userId)

      return reply.status(200).send(order)
    } catch (error) {
      if (error instanceof z.ZodError) {
                      const formattedErrors = error.errors.map(err => ({
                          field: err.path.join('.'),
                          message: err.message
                      }));
                      
                      return reply.status(400).send({
                          error: 'Validation failed',
                          details: formattedErrors
                      });
                  }
                  console.log(error)
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply)
  {
    try {
      const userId = request.user.sub
      const orders = await orderListFactory().execute(userId)

      return reply.status(200).send(orders)
    } catch (error) {
      
    }
  }

  async showById(request: FastifyRequest, reply: FastifyReply)
  {
    const {id} = request.params
    console.log(id)
    try {
      const orders = await orderListByIdFactory().execute(id as string)
      return reply.status(200).send(orders)
    } catch (error) {
      console.error(error)
    }
  }
}