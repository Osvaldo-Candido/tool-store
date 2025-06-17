import { Category } from "../use-cases/category/category-create"

export interface CategoryRepository {
  create(data: Omit<Category, 'id'>): Promise<Category>
  update(data: Partial<Category>, categoryId: string): Promise<Category>
  delete(categoryId: string): Promise<void>
  findById(categoryId: string): Promise<Category>
  getAll():Promise<Category>
}