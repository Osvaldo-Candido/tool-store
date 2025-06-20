import { UserRepository } from "../../repositories/user-repository";
import { User } from "../../../generated/prisma";

export class UserUpdateUseCase {
  constructor(
    private userRepository: UserRepository
  ){}
  async execute(data: User, userId: string){
    const user = await this.userRepository.findById(userId)
    
    if(!user)
    {
      throw new Error('This user not exists')
    }

    const userUpdated = await this.userRepository.update({
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      avatar: data.avatar ?? user.avatar
    }, userId)

    return userUpdated
  }
}