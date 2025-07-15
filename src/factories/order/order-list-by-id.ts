import { OrderRepositoryPrisma } from "../../repositories/prisma/order-repository-prisma";
import { ListOrdersByOrderIdUseCase } from "../../use-cases/order/order-list-id";

export function orderListByIdFactory()
{
  const orderRepository = new OrderRepositoryPrisma()
  const orderListByIdUseCase = new ListOrdersByOrderIdUseCase(orderRepository)
  return orderListByIdUseCase
}