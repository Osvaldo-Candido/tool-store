import { OrderRepository } from "../../repositories/order-repository";
import { UserRepository } from "../../repositories/user-repository";
import { OrderResponseDTO } from "./order-create";

export class OrderListByIdUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository
  ){}
  async execute(userId: string): Promise<OrderResponseDTO | null>{
    const user = await this.userRepository.findById(userId)

    if(!user)
    {
      throw new Error('This user is unauthorized')
    }

    const orders = await this.orderRepository.findByUserId(userId)

    return orders
  }
}