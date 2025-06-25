import { CategoryPrismaRepository } from "../../repositories/prisma/category-repository";
import { ProductRepositoryPrisma } from "../../repositories/prisma/product-repository-prisma";
import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { ProductCreateUseCase } from "../../use-cases/product/product-create";
import { UserCreateUseCase } from "../../use-cases/user/user-create";

export function productCreateFactory ()
{
  const productPrismaRepository = new ProductRepositoryPrisma()
  const userRepositoryPrisma = new UserRepositoryPrisma()
  const categoryRepositoryPrisma = new CategoryPrismaRepository()
  const productCreateUseCase = new ProductCreateUseCase(productPrismaRepository, userRepositoryPrisma, categoryRepositoryPrisma)

  return productCreateUseCase
}