import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import * as fs from 'fs';

@Injectable()
export class ZipService {
  async zipDirectory(sourceDir: string, outPath: string): Promise<void> {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Level of compression
    });

    return new Promise((resolve, reject) => {
      output.on('close', () => resolve());
      archive.on('error', (err) => reject(err));

      archive.pipe(output);

      archive.directory(sourceDir, false);
      archive.finalize();
    });
  }
}
