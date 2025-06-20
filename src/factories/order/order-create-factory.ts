import { OrderRepositoryPrisma } from "../../repositories/prisma/order-repository-prisma";
import { ProductRepositoryPrisma } from "../../repositories/prisma/product-repository-prisma";
import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { OrderCreateUseCase } from "../../use-cases/order/order-create";

export function orderCreateFactory()
{
  const orderRepositoryPrisma = new OrderRepositoryPrisma()
  const userRepositoryPrisma = new UserRepositoryPrisma()
  const productRepositoryPrisma = new ProductRepositoryPrisma()
  const orderCreateUseCase = new OrderCreateUseCase(productRepositoryPrisma,userRepositoryPrisma, orderRepositoryPrisma)

  return orderCreateUseCase
}