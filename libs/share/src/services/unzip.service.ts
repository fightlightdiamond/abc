import { Injectable } from '@nestjs/common';
import * as unzipper from 'unzipper';
import * as fs from 'fs';

@Injectable()
export class UnzipService {
  async unzipFile(zipFilePath: string, outPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: outPath }))
        .on('close', () => resolve())
        .on('error', (err) => reject(err));
    });
  }
}
