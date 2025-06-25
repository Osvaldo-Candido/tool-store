import { MultipartFile } from '@fastify/multipart'
import {v2 as cloudinary} from 'cloudinary'
import { FastifyInstance } from 'fastify/types/instance'
import { pipeline } from 'stream/promises'
import { env } from '../env'

cloudinary.config({ 
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true // Recomendado para produção
})

export class CloudinaryService {

  static async uploadFile(file: MultipartFile, folder: string)
  {
    return new Promise<{url: string, public_id: string}>((resolve, reject) => {
      const uploadStrem = cloudinary.uploader.upload_stream({
        folder
      },
      (err, result) => {
          if(err || !result)
          {
            reject(err || new Error('Upload Failed'))
          }else{
            resolve({
              url: result.url,
              public_id: result.public_id
            })
          }
        })

        pipeline(file.file, uploadStrem).catch(reject)
    })
  }

  async deleteFile(publicId: string)
  {
      return new Promise((reject, resolve)=>{
        cloudinary.uploader.destroy(publicId, (err, result) => {
              if(err) reject(result)
              else resolve(result)
        })
      })
  }
}
