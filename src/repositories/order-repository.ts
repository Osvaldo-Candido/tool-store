import { OrderCreateRequestDTO, OrderItem, OrderResponseDTO } from "../use-cases/order/order-create";

export interface OrderRepository {
  create(data: OrderCreateRequestDTO):Promise<OrderResponseDTO>
  update(data: Partial<OrderItem>): Promise<OrderResponseDTO>
  findById(orderId: string): Promise<OrderResponseDTO | null>
  findByUserId(userId: string): Promise<OrderResponseDTO | null>
}