import { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { categoryCreateFactory } from "../factories/category/category-create-factory";
import { categorySingleFactory } from "../factories/category/category-single-factory";
import { categorySelectFactory } from "../factories/category/category-select-factory";

type CategoryType = {
  name: string
  description: string
}

const categorySchema = z.object({
  name: z.string(),
  description: z.string()
}) 

export class CategoryController {

  async index(reply: FastifyReply) {
      try {
        const categories = await categorySelectFactory().execute()

        return categories
      } catch (error) {
        
      }
  }

  async show(request: FastifyRequest, reply: FastifyReply){
    const {id} = request.params as any
    try {
      const category = await categorySingleFactory().execute(id)

      return reply.status(200).send(category)
    } catch (error) {
      
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply){
    try {
      const body = request.body as CategoryType

      const categoryValidate = categorySchema.parse(body)

      const userId = request.user.sub

      const category = await categoryCreateFactory().execute(categoryValidate, userId)

      return reply.status(200).send(category)
    } catch (error) {
      console.log(error)
    }
  }
}