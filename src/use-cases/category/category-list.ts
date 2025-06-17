import { CategoryRepository } from "../../repositories/category-repository";

export class ListCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository
  ){}
  async execute(){
    return await this.categoryRepository.getAll()
  }
}