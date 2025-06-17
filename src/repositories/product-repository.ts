import { Product, ProductRequestDTO } from "../use-cases/product/product-create";

export interface ProductRepository {
  create(data: ProductRequestDTO):Promise<Product>
  update(data: Partial<Product>):Promise<Product>
  delete(productId: string):Promise<void>
  getAll():Promise<Product>
  findById(productId: string):Promise<Product>
}