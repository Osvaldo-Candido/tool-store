import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { UserCreateUseCase } from "../../use-cases/user/user-create";

export function UserCreateFactory()
{
    const userRepositoryPrisma = new UserRepositoryPrisma ()
    const userCreateUseCase = new UserCreateUseCase(userRepositoryPrisma)

    return userCreateUseCase
}