import { OrderRepository } from "../../repositories/order-repository"
import { ProductRepository } from "../../repositories/product-repository"
import { UserRepository } from "../../repositories/user-repository"
import { Status } from "../../../generated/prisma"

export interface OrderItem {
  productId: string
  quantity: number
  subtotal: number
  unitiPrice: number
  itemId?: string
}

export interface OrderResponseDTO {
  userId: string
  items:  OrderItem []
  totalAmount: number
  status: Status
}

export interface OrderCreateRequestDTO {
  userId: string
  status: Status
  items:  Array<{
    productId: string,
    quantity: number,
  }>
  total: number
}


export class OrderCreateUseCase {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
    private orderRepository: OrderRepository
  ){}
  async execute(data: OrderCreateRequestDTO, userId: string){
    const user = await this.userRepository.findById(userId)

    console.log(data)

    if(!user)
    {
      throw new Error('This user is unauthorized')
    }

    const products = await Promise.all(data.items.map((item) => {
      return this.productRepository.findById(item.productId)
    }))

    console.log(products)

    if(products.some(p => !p || !p.active))
    {
      throw new Error('One or more product unvalaible')
    }

    const productWithPrice = data.items.map((item) => {
      const product = products.find(p => p?.id === item.productId)!

      return {
        ...item,
        unitiPrice: product.price,
        subtotal: product.price * item.quantity
      }
    })

    const total = productWithPrice.reduce((sum, item) => sum + item.subtotal, 0)

    const orderCreated = await this.orderRepository.create({
      status: Status.SHIPPED,
      totalAmount: total,
      userId: userId,
      items: productWithPrice,
    })

    return orderCreated
  }
}