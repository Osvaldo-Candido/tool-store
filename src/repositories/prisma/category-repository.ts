import { Category } from "../../../generated/prisma";
import { prisma } from "../../database/prisma";
import { CategoryRepository } from "../category-repository";

export class CategoryPrismaRepository implements CategoryRepository {
  async create(data: Omit<Category, "id">): Promise<Category> {
   return await prisma.category.create({
    data: {
      name: data.name,
      description: data.description,
    }
   })
  }
  async update(data: Partial<Category>, categoryId: string): Promise<Category> {
    return await prisma.category.update({
      where: {id: categoryId},
      data: {
        ...data
      }
    })
  }
  async delete(categoryId: string): Promise<void> {
    await prisma.category.delete({where:{id: categoryId}})
  }
  async findById(categoryId: string): Promise<Category | null> {
    return await prisma.category.findUnique({where: {id: categoryId}}) 
  }
  async getAll(): Promise<Category [] | null> {
    return await prisma.category.findMany()
  }

}