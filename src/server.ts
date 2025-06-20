import fastify from 'fastify'
import multipartfastify from '@fastify/multipart'
import { userRoutes } from './routes/user.routes'
import fastifyJwt from '@fastify/jwt' 
import { env } from './env'
import { authRoutes } from './routes/auth.routes'

const app = fastify()

app.register(multipartfastify, {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5
  }
})

app.register(fastifyJwt,{
secret: env.JWT_SECRET
})

app.register(userRoutes)
app.register(authRoutes)

app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => console.log('The server is running'))