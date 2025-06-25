import { CategoryPrismaRepository } from "../../repositories/prisma/category-repository";
import { SingleCategoryUseCase } from "../../use-cases/category/category-single";

export function categorySingleFactory()
{
  const categoryRepositoryPrisma = new CategoryPrismaRepository()
  const singleCategoryUseCase = new SingleCategoryUseCase(categoryRepositoryPrisma)
  return singleCategoryUseCase
}