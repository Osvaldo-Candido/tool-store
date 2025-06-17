import { User, UserRequestDTO } from "../use-cases/user/user-create";

export interface UserRepository {
  create (data: UserRequestDTO): Promise<User>,
  update (data: Partial<User>, userId: string): Promise<User>,
  findByEmail (email: string): Promise<User>,
  findById (userId: string): Promise<User>
}