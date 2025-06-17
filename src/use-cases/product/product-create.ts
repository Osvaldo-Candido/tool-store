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
  active: boolean
}

export class ProductCreateUseCase {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository
  ){
  
  }
  async execute(data:ProductRequestDTO, userId: string){
      const user = await this.userRepository.findById(userId)

      if(!user || user.role !== 'ADMIN')
      {
        throw new Error('This user is unauthorized')
      }

      const createdProduct = await this.productRepository.create({
        name: data.name,
        price: data.price,
        description: data.description,
        active: true
      })

      return createdProduct
  }
}