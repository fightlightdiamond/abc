import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorator';
import * as path from 'path';
import { readFile, UnzipService, ZipService } from '../libs/share/src/';
import { ApiTags } from '@nestjs/swagger';
import { readAndValidateJsonFile } from '@app/share/validators/json.validator';
import { CreateQuestionDto } from './question/dto/create-question.dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly zipService: ZipService,
    private readonly unzipService: UnzipService,
  ) {}

  @Public()
  @Post('zip')
  async zipFiles(): Promise<string> {
    const sourceDir = path.join(__dirname, '..', 'public', 'source_folder');
    const outPath = path.join(
      __dirname,
      '..',
      'public',
      'output_folder',
      'archived.zip',
    );

    await this.zipService.zipDirectory(sourceDir, outPath);
    return 'Files zipped successfully';
  }

  @Public()
  @Post('unzip')
  async unzipFiles(): Promise<string> {
    const zipFilePath = path.join(
      __dirname,
      '..',
      'public',
      'output_folder',
      'archived.zip',
    );
    const outPath = path.join(__dirname, '..', 'public', 'unzipped_folder');

    await this.unzipService.unzipFile(zipFilePath, outPath);
    return 'Files unzipped successfully';
  }

  @Public()
  @Post('read')
  async read() {
    const outPath = path.join(
      __dirname,
      '..',
      'public',
      'unzipped_folder',
      'abc.txt',
    );

    // const data = await readFile(outPath);
    return await readAndValidateJsonFile(outPath, CreateQuestionDto);
  }
}
