import { CategoryRepository } from "../../repositories/category-repository";

export class SingleCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository
  ){}
  async execute(categoryId: string){
    const category = await this.categoryRepository.findById(categoryId)

    return category
  }
}