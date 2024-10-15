import * as tf from '@tensorflow/tfjs-node';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

class DetectModel {
  private mymodel!: cocoSsd.ObjectDetection;

  constructor(){

    

  }
 

    public async   loadDetectionModel(): Promise<void> {
    let shouldRetry:boolean  = true;
    while(shouldRetry){
      try{
        this.mymodel = await cocoSsd.load({ base: "mobilenet_v2" });
        shouldRetry = false;
      }catch(error){
        console.log(error)

      }



    }

  }

  public async detect(imageBuffer:   
      Uint8Array): Promise<cocoSsd.DetectedObject[]> {
    const decodedImage =  tf.node.decodeJpeg(imageBuffer);
    const prediction = await this.mymodel.detect(decodedImage);
    return prediction;
  }
}



let model:DetectModel = new DetectModel();
//await model.loadDetectionModel()
export default model;