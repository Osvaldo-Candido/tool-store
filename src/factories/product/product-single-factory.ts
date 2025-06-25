import { ProductRepositoryPrisma } from "../../repositories/prisma/product-repository-prisma";
import { ProductListUseCase } from "../../use-cases/product/product-list";
import { ProductSingleUseCase } from "../../use-cases/product/product-single";

export function productSingleFactory()
{
  const productRepository = new ProductRepositoryPrisma()
  const productSingleUseCase = new ProductSingleUseCase(productRepository)

  return productSingleUseCase
}