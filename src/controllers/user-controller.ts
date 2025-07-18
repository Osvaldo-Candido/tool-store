import { FastifyReply, FastifyRequest } from "fastify";
import { CloudinaryService } from "../config/cloudinary";
import z from 'zod'
import { Role } from "../use-cases/user/user-create";
import { userCreateFactory } from "../factories/user/user-create-factory";

const userCreateSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 carácteres'),
  email: z.string().email('O email adicionado é inválido'),
  password: z.string().min(6,'A palavra passe deve ter no mínimo 6 carácteres'),
  role: z.nativeEnum(Role).default(Role.CLIENT),
  avatar: z.string().optional()
}) 

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply)
  {
     // const parts = await request.parts()
      
     const body = await request.parts()
     const formData: Record<string, any> = {}
     let avatarUrl: string | undefined
     let avatarPublicId: string | undefined

     try {
      for await (const part of body )
     {
      if(part.type == 'file' && part.fieldname === 'avatar')
      {
        const result = await CloudinaryService.uploadFile(part, 'users-avatar')

        avatarUrl = result.url
        avatarPublicId = result.public_id

      }else if(part.type === 'field') {
        formData[part.fieldname] = part.value
      }
     }

     const userValidade = userCreateSchema.parse(formData)
     
     const user = await userCreateFactory().execute({
      ...userValidade,
      avatar: avatarUrl
     })

     return reply.status(201).send(user)
     } catch (error) {
      console.log(error)
      throw new Error('Erro')
     }
     

      
      
  }
}