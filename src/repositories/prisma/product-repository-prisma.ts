import { Product } from "../../../generated/prisma";
import { prisma } from "../../database/prisma";
import { ProductRequestDTO } from "../../use-cases/product/product-create";
import { ProductRepository } from "../product-repository";

export class ProductRepositoryPrisma implements ProductRepository {
  async create(data: ProductRequestDTO & {userId: string}): Promise<Product> {
    return await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        active: data.active,
        userId: data.userId,
        categoryId: data.categoryId
        
      }
    }) 
  }
  update(data: Partial<Product>): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  findById(productId: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }

}