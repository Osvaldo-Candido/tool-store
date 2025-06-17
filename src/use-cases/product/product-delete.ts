import { ProductRepository } from "../../repositories/product-repository";

export class ProductDeleteUseCase {
  constructor(
    private productRepository: ProductRepository
  ){}
  async execute(productId:string){
      await this.productRepository.delete(productId)
  }
}