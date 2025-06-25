import { ProductRequestDTO } from "../use-cases/product/product-create";
import { Product } from "../../generated/prisma";

export interface ProductRepository {
  create(data: ProductRequestDTO & {userId: string}):Promise<Product>
  update(data: Partial<Product>):Promise<Product>
  delete(productId: string):Promise<void>
  getAll():Promise<Product []>
  findById(productId: string):Promise<Product | null>
}