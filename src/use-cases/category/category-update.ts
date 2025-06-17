import { CategoryRepository } from "../../repositories/category-repository";
import { Category } from "./category-create";

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository
  ){}
  async execute(data: Category, categoryId: string){
      const category = await this.categoryRepository.findById(categoryId)

      if(!category)
      {
        throw new Error('Invalid category')
      }

      const updatedCategory = await this.categoryRepository.update({
        name: data.name ?? category.name,
        description: data.description ?? category.description
      }, categoryId)

      return updatedCategory
  }
}