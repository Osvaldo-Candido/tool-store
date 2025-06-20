import { prisma } from "../../database/prisma";
import { UserRequestDTO } from "../../use-cases/user/user-create";
import { UserRepository } from "../user-repository";
import { Role } from "../../../generated/prisma";
import { User } from "../../../generated/prisma";

export class UserRepositoryPrisma implements UserRepository {
  private toDomain(user: User) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role as Role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatar: user.avatar
      }
  }

  async create(data: UserRequestDTO): Promise<User> {
    
    const user = await prisma.user.create({
      data:{
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role as Role,
        avatar: data.avatar
      }
    })

    return this.toDomain(user)

  }
  async update(data: Partial<User>, userId: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data:{
        ...data
      }
    })

    return this.toDomain(user)
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({where:{email}})

    if(!user)
    {
      return null
    }

    return this.toDomain(user)
  }
  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({where: {id: userId}})

    if(!user)
    {
      return null
    }

    return user
  }

}