import { ProductRepositoryPrisma } from "../../repositories/prisma/product-repository-prisma";

export function productCreateFactory ()
{
  const productPrismaRepository = new ProductRepositoryPrisma()
}