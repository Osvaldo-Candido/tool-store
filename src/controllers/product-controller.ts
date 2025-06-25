import { FastifyReply, FastifyRequest } from "fastify";
import { CloudinaryService } from "../config/cloudinary";
import z from 'zod'
import { productListFactory } from "../factories/product/product-list-factory";
import { productSingleFactory } from "../factories/product/product-single-factory";
import { productCreateFactory } from "../factories/product/product-create-factory";

const productSchema = z.object({
    name: z.string({
        required_error: "Product name is required",
        invalid_type_error: "Product name must be a string"
    }).min(3, "Product name must be at least 3 characters"),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).nonnegative("Price must be a positive number"),
    description: z.string({
        invalid_type_error: "Description must be a string"
    }).optional(),
    active: z.boolean({
        invalid_type_error: "Active must be a boolean"
    }).default(true),
    categoryId: z.string({
        required_error: "Category ID is required",
        invalid_type_error: "Category ID must be a string"
    }).uuid("Category ID must be a valid UUID"),
    images: z.array(z.object({
        url: z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image URL must be a string"
        }),
        publicId: z.string({
            required_error: "Image public ID is required",
            invalid_type_error: "Image public ID must be a string"
        })
    }), {
        required_error: "At least one image is required"
    })
}); 
const idParamSchema = z.object({
  id: z.string().uuid()
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
              if (part.file.truncated) {
                return reply.status(413).send({ error: 'O arquivo excede o limite de 10MB.' })
              }
              const result = await CloudinaryService.uploadFile(part, 'products-store')
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

        const productData = {
              name: formData.name,
              price: parseFloat(formData.price),
              description: formData.description,
              categoryId: formData.categoryId,
              active: formData.active === 'true',
              images
            };
        

        const product = await productCreateFactory().execute(
          productData,
          request.user.sub,
          formData.categoryId
        );

        return reply.status(200).send(product)
      } catch (error) {
         if (error instanceof z.ZodError) {
                // Formata os erros do Zod de forma mais amigável
                const formattedErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                
                return reply.status(400).send({
                    error: 'Validation failed',
                    details: formattedErrors
                });
            }

      }
  }

  async index(reply: FastifyReply){
    try {
      const users = await productListFactory().execute()

      return reply.status(200).send(users)
    } catch (error) {   
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply){
      try {
        const {id} = idParamSchema.parse(request.params)
        
        const product = await productSingleFactory().execute(id)

        return reply.status(200).send(product)

      } catch (error) {
        
      }
  }
}