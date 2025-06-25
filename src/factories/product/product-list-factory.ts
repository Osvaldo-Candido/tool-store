import { ProductRepositoryPrisma } from "../../repositories/prisma/product-repository-prisma";
import { ProductListUseCase } from "../../use-cases/product/product-list";

export function productListFactory()
{
  const productRepository = new ProductRepositoryPrisma()
  const productListUseCase = new ProductListUseCase(productRepository)

  return productListUseCase
}