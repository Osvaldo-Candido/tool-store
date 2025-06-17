import { compare } from "bcryptjs";
import { UserRepository } from "../../repositories/user-repository";

interface UserLoginResposeDTO {
  email: string
  password: string
}

export class UserLogin {
  constructor(
    private userRepository: UserRepository
  ){}
 async execute(data: UserLoginResposeDTO){
    const user = await this.userRepository.findByEmail(data.email)

    if(!user)
    {
      throw new Error('Email or password wrong')
    }

    const passwordCompare = await compare(data.password, user.password)

    if(!passwordCompare)
    {
      throw new Error('Email or password wrong')
    }

    return user
  }
}