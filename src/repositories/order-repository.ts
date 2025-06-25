import { Order } from "../../generated/prisma";
import { OrderCreateRequestDTO, OrderItem, OrderResponseDTO } from "../use-cases/order/order-create";

export interface OrderRepository {
  create(data: OrderResponseDTO):Promise<Order>
  update(data: Partial<OrderItem>): Promise<OrderResponseDTO>
  findById(orderId: string): Promise<Order | null>
  findByUserId(userId: string): Promise<Order [] | null>
}