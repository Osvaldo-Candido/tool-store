import { Category } from "../../generated/prisma"

export interface CategoryRepository {
  create(data: Omit<Category, 'id'>): Promise<Category>
  update(data: Partial<Category>, categoryId: string): Promise<Category>
  delete(categoryId: string): Promise<void>
  findById(categoryId: string): Promise<Category | null>
  getAll():Promise<Category [] | null>
}