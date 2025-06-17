import { CategoryRepository } from "../../repositories/category-repository";

export class CategoryDeleteUseCase {
  constructor(
    private categoryRepository: CategoryRepository
  ){}
  async execute(categoryId: string){
    await this.categoryRepository.delete(categoryId)
  }
}