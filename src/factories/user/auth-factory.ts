import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { UserLogin } from "../../use-cases/user/user-login";

export function authFactory ()
{
  const authUser = new UserRepositoryPrisma()
  const userLogin = new UserLogin(authUser)

  return userLogin
}