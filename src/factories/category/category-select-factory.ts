import { ListCategoryUseCase } from './../../use-cases/category/category-list';
import { CategoryPrismaRepository } from "../../repositories/prisma/category-repository";

export function CategoryCreateFactory()
{
  const categoryRepositoryPrisma = new CategoryPrismaRepository()
  const listCategoryUseCase = new ListCategoryUseCase(categoryRepositoryPrisma)
  return listCategoryUseCase
}