import { CategoryRepository } from "../../repositories/category-repository"
import { UserRepository } from "../../repositories/user-repository"

export interface Category {
  id: string
  name: string
  description:  string
}

export class CategoryCreateUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository
  ){}

  async execute(data: Category, userId: string) {
    const user = await this.userRepository.findById(userId)

    if(!user || user.role !== 'ADMIN')
    {
      throw new Error('This user is unauthorized')
    }

    const category = await this.categoryRepository.create({
      name: data.name,
      description: data.description
    })

    return category
  }
}