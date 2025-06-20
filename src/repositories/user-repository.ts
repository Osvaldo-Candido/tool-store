import { UserRequestDTO } from "../use-cases/user/user-create";
import { User } from "../../generated/prisma";

export interface UserRepository {
  create (data: UserRequestDTO): Promise<User>,
  update (data: Partial<User>, userId: string): Promise<User>,
  findByEmail (email: string): Promise<User | null>,
  findById (userId: string): Promise<User | null>
}