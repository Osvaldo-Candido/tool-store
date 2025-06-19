import { FastifyReply, FastifyRequest } from "fastify";
import { CloudinaryService } from "../config/cloudinary";

type UserData = {
  name: string
  email: string
  password: string
}

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply)
  {
     // const parts = await request.parts()
      
     const body = await request.parts()
     const formData: Record<string, any> = {}
     let avatarUrl: string | undefined
     let avatarPublicId: string | undefined

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

     return reply.status(201).send(formData)

      
      
  }
}