import { hash } from "bcryptjs"
import { UserRepository } from "../../repositories/user-repository"

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}
export interface User {
  id: string
  name: string
  email:  string
  password: string
  role: Role
  avatar?: string
  publicUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserRequestDTO {
  name: string
  email:  string
  password: string
  role: Role
  avatar?: string
}

export class UserCreateUseCase {
  constructor(
    private userRepository:UserRepository
  ){}
  async execute(data: UserRequestDTO){

    const userEmail = await this.userRepository.findByEmail(data.email)
    
    if(userEmail)
    {
      throw new Error('This email is already')
    }

    const hashPassword = await hash(data.password, 6)

    if(!hashPassword)
    {
      throw new Error('This password is invalid')
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashPassword,
      role: data.role,
      avatar: data.avatar 
    })

    return user
  }
}