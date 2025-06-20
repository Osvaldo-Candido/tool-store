import { OrderRepositoryPrisma } from "../../repositories/prisma/order-repository-prisma";
import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { OrderListByIdUseCase } from "../../use-cases/order/order-list-by-id";

export function orderListFactory()
{
  const orderRepositoryPrisma = new OrderRepositoryPrisma()
  const userRepositoryPrisma = new UserRepositoryPrisma()
  const orderCreateUseCase = new OrderListByIdUseCase(orderRepositoryPrisma, userRepositoryPrisma)

  return orderCreateUseCase
}