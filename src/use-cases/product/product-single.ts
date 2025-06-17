import { ProductRepository } from "../../repositories/product-repository";

export class ProductSingleUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}
  async execute(productId: string){
    const product = await this.productRepository.findById(productId)

    return product
  }
}