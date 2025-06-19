import { MultipartFile } from '@fastify/multipart'
import {v2 as cloudinary} from 'cloudinary'
import { FastifyInstance } from 'fastify/types/instance'
import { pipeline } from 'stream/promises'

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME
})

export class CloudinaryService {

  static async uploadFile(file: MultipartFile, folder: string)
  {
    return new Promise<{url: string, public_id: string}>((resolve, reject) => {
      const uploadStrem = cloudinary.uploader.upload_stream({
        folder,
        transformation: [
          {width: 200, height: 200, crop: 'thumb',gravity: 'auto:face'},
          {quality: 'auto:best'}
        ]
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
