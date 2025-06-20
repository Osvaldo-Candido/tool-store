import { FastifyReply, FastifyRequest } from "fastify";
import { CloudinaryService } from "../config/cloudinary";
import z from 'zod'

const productSchema = z.object({
    name: z.string(),
    price: z.number().nonnegative(),
    description: z.string().optional(),
    active: z.boolean().default(true),
    categoryId: z.string(),
    images: z.array(z.object({
      url: z.string(),
      publicId: z.string()
    }))
}) 

export class ProductController {
  async create(request: FastifyRequest, reply: FastifyReply)
  {
      const parts = request.parts()
      const formData: Record<string, any> = {}
      const images: Array<{url: string, publicId: string}> = []

      try {
        for await (const part of parts)
        {
          if(part.type === 'file')
          {
            const result = await CloudinaryService.uploadFile(part, 'products')
            images.push({
              url: result.url,
              publicId: result.public_id
            })
          }else {
           
            const integerNumbers = ['price']

            if(integerNumbers.includes(part.fieldname))
            {
                 formData[part.fieldname] = Number(part.value)
            }else if(part.fieldname === 'active')
            {
                formData[part.fieldname] = part.value === 'true'
            }else{
                  formData[part.fieldname] = part.value
            }
          }
        }
        const productValidate = productSchema.parse(formData)

        
      } catch (error) {
        
      }


  }
}