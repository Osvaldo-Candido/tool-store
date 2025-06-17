import { CategoryRepository } from "../../repositories/category-repository"
import { ProductRepository } from "../../repositories/product-repository"
import { UserRepository } from "../../repositories/user-repository"

export interface Product {
  id: string
  name: string
  price: number
  description: string
  active: boolean
  createdAt: Date
  categoryId: string
}

export interface ProductRequestDTO {
  name: string
  price: number
  description: string
  categoryId: string
  active: boolean
}

export class ProductCreateUseCase {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository
  ){
  
  }
  async execute(data:ProductRequestDTO, userId: string, categoryId: string){
      const user = await this.userRepository.findById(userId)

      if(!user || user.role !== 'ADMIN')
      {
        throw new Error('This user is unauthorized')
      }

      const category = await this.categoryRepository.findById(categoryId)

      if(!category)
      {
        throw new Error('Category inavlid')
      }
      const createdProduct = await this.productRepository.create({
        name: data.name,
        price: data.price,
        description: data.description,
        active: true,
        categoryId: categoryId
      })

      return createdProduct
  }
}