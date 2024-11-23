import model from '#config/model'
import Image from '#models/image'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import fs from 'node:fs';

export default class ImagesController {

    ImageController(){
    }

    private fileToUint8Array(filePath: string): Uint8Array | undefined {

        try {
          const fileBuffer = fs.readFileSync(filePath);
          return new Uint8Array(fileBuffer);
        } catch (error) {
          console.error(`Error reading file '${filePath}':`, error);
          return undefined;
        }
      }
      
    public async predict(httpContext:HttpContext) {
    

     

        const image = httpContext.request.file('image', {
          })
        
          console.log(httpContext.request.allFiles())
          
          if(image){
            const image_name =`${cuid()}.${image.extname}`;
            await image.move(app.makePath('storage/uploads'), {
                name: image_name
              })
            var imagePredictions:string[] = [];
            const imageModel:Image = await Image.create({image_name:image_name})
            await imageModel.save()
            const data = this.fileToUint8Array(`storage/uploads/${image_name}`)
            let alert:string = "There is, ";
            if(data){
              var dos:cocoSsd.DetectedObject[]  =   await  model.detect(data)
              if(dos.length > 0){
                console.log(dos)
                dos.forEach((os)=>{
                     imagePredictions.push(os.class)
                     alert = alert + os.class +";"
                     
                })  
              }else{
                alert = alert + "none";

              }

              const user:User =   httpContext.auth.user!;


              (await user.related("alerts").create({alert : alert, imageUrl : `storage/uploads/${image_name}`})).save();
                    }else{
              }

          
           return {"detectedObjects" : imagePredictions};
        }

            return {"code": -1, "message" : "Something went wrong"}


          }

           
          
    }
