import * as sharp from 'sharp';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageResizeService {
  constructor() {}
  async resize(fileStream, height: number, width: number) {
    return await fileStream.pipe(
      sharp()
        .resize({ width, height })
        .toFormat('jpeg', { mozjpeg: true })
        .jpeg(),
    );
  }

  async thumbnail(fileStream) {
    return await this.resize(fileStream, 150, 150);
  }

  async card(fileStream) {
    return await this.resize(fileStream, 300, 200);
  }

  async mobileProfilePic(fileStream){
    return await this.resize(fileStream, 300, 300);
  }

 
}
