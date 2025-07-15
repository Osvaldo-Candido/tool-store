import { OrderRepository } from "../../repositories/order-repository";

export class ListOrdersByOrderIdUseCase {
  
  constructor(private orderRepository: OrderRepository){}
  
  async execute(orderId: string)
  {
      const orders = await this.orderRepository.findById(orderId)

      return orders
  }
}