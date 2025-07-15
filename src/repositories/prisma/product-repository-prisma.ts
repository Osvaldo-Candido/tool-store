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
        categoryId: data.categoryId,
        description: data.description,
        images: {
          createMany:{
            data: data.images.map(i => ({
              url: i.url,
              publicId: i.publicId
            }))
          }
        }
      },
      include: {
        images: true
      }
    }) 
  }
  update(data: Partial<Product>): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Product []> {
      return await prisma.product.findMany({
        include: {
          images: true
        }
      })
  }
  async findById(productId: string): Promise<Product | null> {
    console.log(productId)
   const product = prisma.product.findFirst({where: {id: productId}, include: {images: true}})

   if(!product)
   {
    return null
   }

   return product
  }

}