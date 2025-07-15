import fastify from 'fastify'
import multipartfastify from '@fastify/multipart'
import { userRoutes } from './routes/user.routes'
import fastifyJwt from '@fastify/jwt' 
import { env } from './env'
import { authRoutes } from './routes/auth.routes'
import { categoryRoutes } from './routes/category.routes'
import { productRoutes } from './routes/product.routes'
import { ZodError } from 'zod'
import { OrderRoutes } from './routes/order.routes'
import cors from '@fastify/cors'

const app = fastify()

app.register(cors, {
  origin: true,
  methods: ['GET','POST','PUT','DELETE']
})

app.register(multipartfastify, {
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5
  }
})

app.register(fastifyJwt,{
secret: env.JWT_SECRET
})


app.register(userRoutes)
app.register(authRoutes)
app.register(categoryRoutes)
app.register(productRoutes)
app.register(OrderRoutes)

app.setErrorHandler((error, request, reply)=>{
  if(error instanceof ZodError)
  {
    return reply.status(400).send({message: 'Validation error', issues: error.format()})
  }

  return reply.status(500).send('Internal')
})

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => console.log('The server is running'))