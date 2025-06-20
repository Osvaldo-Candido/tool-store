import { OrderCreateRequestDTO, OrderResponseDTO, OrderItem } from "../../use-cases/order/order-create";
import { OrderRepository } from "../order-repository";

export class OrderRepositoryPrisma implements OrderRepository {
  create(data: OrderCreateRequestDTO): Promise<OrderResponseDTO> {
    throw new Error("Method not implemented.");
  }
  update(data: Partial<OrderItem>): Promise<OrderResponseDTO> {
    throw new Error("Method not implemented.");
  }
  findById(orderId: string): Promise<OrderResponseDTO | null> {
    throw new Error("Method not implemented.");
  }
  findByUserId(userId: string): Promise<OrderResponseDTO | null> {
    throw new Error("Method not implemented.");
  }

}