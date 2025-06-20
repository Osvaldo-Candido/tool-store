import { ProductImage } from "../../../generated/prisma"
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
  images: ProductImage []
}

export interface ProductRequestDTO {
  name: string
  price: number
  description: string
  categoryId: string
  active: boolean
  images: Array<{
    url: string
    publicId: string
  }>
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

      const images = data.images.map((image) => {
        return {
          url: image.url,
          publicId:  image.publicId
        }
      })

      const createdProduct = await this.productRepository.create({
        ...data,
        userId,
        categoryId,
        active: data.active ?? true
      })

      return createdProduct
  }
}