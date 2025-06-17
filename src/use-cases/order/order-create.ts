import { OrderRepository } from "../../repositories/order-repository"
import { ProductRepository } from "../../repositories/product-repository"
import { UserRepository } from "../../repositories/user-repository"

enum Status {
  CANCELED = 'CANCELED',
  SHIPPED = 'SHIPPED'
}

export interface OrderItem {
  productId: string
  unitiPrice: number
  quantity: number
  subtotal: number
}

export interface OrderResponseDTO {
  userId: string
  items:  OrderItem []
  total: number
  createdAt: Date
}

export interface OrderCreateRequestDTO {
  userId: string
  status: Status
  items:  Array<{
    productId: string,
    quantity: number
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

    if(!user)
    {
      throw new Error('This user is unauthorized')
    }

    const products = await Promise.all( data.items.map((item) => {
      return this.productRepository.findById(item.productId)
    }))

    if(products.some(p => !p || !p.active))
    {
      throw new Error('One or more product unvalaible')
    }

    const productWithPrice = data.items.map((item) => {
      const product = products.find(p => p.id === item.productId)!

      return {
        ...item,
        unitiPrice: product?.price,
        subtotal: product.price * item.quantity
      }
    })

    const totalAmout = productWithPrice.reduce((sum, item) => sum + item.subtotal, 0)

    const orderCreated = await this.orderRepository.create({
      status: Status.SHIPPED,
      total: totalAmout,
      userId: userId,
      items: productWithPrice
    })
  }
}