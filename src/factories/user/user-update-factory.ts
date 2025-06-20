import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { UserUpdateUseCase } from "../../use-cases/user/user-update";

export function userUpdate()
{
  const userRepositoryPrisma = new UserRepositoryPrisma()
  const userUpdateUseCase = new UserUpdateUseCase(userRepositoryPrisma)

  return userUpdateUseCase
}