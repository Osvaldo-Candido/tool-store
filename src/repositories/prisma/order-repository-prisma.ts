import { Order, Status } from "../../../generated/prisma";
import { prisma } from "../../database/prisma";
import { OrderCreateRequestDTO, OrderResponseDTO, OrderItem } from "../../use-cases/order/order-create";
import { OrderRepository } from "../order-repository";
import { OrderItems } from "../../../generated/prisma";

export class OrderRepositoryPrisma implements OrderRepository {
  async create(data: OrderResponseDTO): Promise<Order> {
    return await prisma.order.create({
      data: {
        userId: data.userId,
        status: data.status,
        totalAmonut: data.totalAmount,
        OrderItems: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            subtotal: item.subtotal,
            unitiPrice: item.unitiPrice
          }))
        }
      },
      include: {
        OrderItems: true
      }
    })
  }
  update(data: Partial<OrderItem>): Promise<OrderResponseDTO> {
    throw new Error("Method not implemented.");
  }
  async findById(orderId: string): Promise<Order | null> {

   const orders = await prisma.order.findFirst({
    where: {id: orderId},
    include: {
      OrderItems: true
    }
   })

   if(!orders)
   {
    return null
   }

   return orders
  }
  async findByUserId(userId: string): Promise<Order [] | null> {
   const orders = await prisma.order.findMany({
    where:{userId: userId}
   })

   if(!orders)
   {
    return null
   }

   return orders
  }

}