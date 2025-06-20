import '@fastify/jwt'
//Ajuda a minha função de profile entender o sub é uma propriedade do usuário
declare module '@fastify/jwt' {
  export interface FastifyJWT {
      user: {
        sub: string
      }
  }
}