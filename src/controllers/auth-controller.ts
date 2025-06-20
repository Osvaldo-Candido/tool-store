import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { authFactory } from "../factories/user/auth-factory";

type UserLogin = {
  email: string
  password: string
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string() 
})

export class AuthController {
  async login(request: FastifyRequest, reply:FastifyReply){
    const body = request.body as UserLogin

    try {
      const loginValidate = loginSchema.parse(body)

      const user = await authFactory().execute(loginValidate)
      
      const token = await reply.jwtSign({}, {
        sign: {
          sub: user.id
        }
      })

      return reply.status(200).send({user, token})

    } catch (error) {
      
    }
  }
}