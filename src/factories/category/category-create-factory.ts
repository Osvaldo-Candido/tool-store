import { CategoryPrismaRepository } from "../../repositories/prisma/category-repository";
import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { CategoryCreateUseCase } from "../../use-cases/category/category-create";

export function CategoryCreateFactory()
{
  const categoryRepositoryPrisma = new CategoryPrismaRepository()
  const userRepositoryPrisma = new UserRepositoryPrisma()
  const createCategoryUseCase = new CategoryCreateUseCase(categoryRepositoryPrisma, userRepositoryPrisma)
  return createCategoryUseCase
}