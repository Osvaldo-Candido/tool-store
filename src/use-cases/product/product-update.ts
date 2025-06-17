import { ProductRepository } from "../../repositories/product-repository";
import { UserRepository } from "../../repositories/user-repository";
import { Product } from "./product-create";

export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository
  ){}

  async execute(data: Product, productId: string, userId: string){
    const user = await this.userRepository.findById(userId)

    if(!user || user.role !== 'ADMIN')
    {
      throw new Error('This user is unauthorized')
    }

    const product = await this.productRepository.findById(productId)

    if(!product || !product.active)
    {
      throw new Error('This product is unvalaible')
    }

    const updatedProduct = await this.productRepository.update({
      name: data.name ?? product.name,
      price: data.price ?? product.price,
      description: data.description ?? product.description,
      active: data.active ?? product.active
    })

    return updatedProduct
  }
}