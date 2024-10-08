import * as tf from '@tensorflow/tfjs-node';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

class DetectModel {
  private mymodel!: cocoSsd.ObjectDetection;

 

    public async   loadDetectionModel(): Promise<void> {
    console.log('Loading model...');
    this.mymodel = await cocoSsd.load({ base: "mobilenet_v2" });
  }

  public async detect(imageBuffer:   
      Uint8Array): Promise<cocoSsd.DetectedObject[]> {
    const decodedImage = await tf.node.decodeJpeg(imageBuffer);
    const prediction = await this.mymodel.detect(decodedImage);
    return prediction;
  }
}



let model:DetectModel = new DetectModel();
await model.loadDetectionModel();

export default model;

