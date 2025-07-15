import { ProductRepository } from "../../repositories/product-repository";

export class ProductListUseCase {
  constructor(
    private produtctRepository: ProductRepository
  ){}

  async execute(){
    const products = await this.produtctRepository.getAll()
    
    //Implementar uma função que retorna apenas productos activos

    return  products 
  }
}