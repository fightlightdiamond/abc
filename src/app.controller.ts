import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from './auth/auth.decorator';
import * as path from 'path';
import { FastifyFilesInterceptor, UnzipService, ZipService } from '@app/share';
import { ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { readAndValidateJsonFile } from '@app/share/validators/json.validator';
import { CreateQuestionDto } from './question/dto/create-question.dto';
import { FastifyFileInterceptor } from '@app/share/interceptors/fastify-file.interceptor';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from '@app/share/utils/file-upload.util';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as fs from 'node:fs';

export class SingleFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  photo_url: string;

  @ApiProperty({ example: 'Rom' })
  username: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}

export class MultipleFileDto {
  @ApiProperty({ type: Array, format: 'binary' })
  photo_url: string[];

  @ApiProperty({ example: 'Rom' })
  username: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}

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

  @Public()
  @ApiConsumes('multipart/form-data')
  @Post('single-file')
  @UseInterceptors(
    FastifyFileInterceptor('photo_url', {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async single(
    @Req() req: Request,
    @UploadedFile() file: any | Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    // await fs.promises.writeFile(file.filename, file.file);
    return { ...body };
  }

  @Public()
  @ApiConsumes('multipart/form-data')
  @Post('multiple-file')
  @UseInterceptors(
    FastifyFilesInterceptor('photo_url', 10, {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  multiple(
    @Req() req: Request,
    @UploadedFiles() files: any | Express.Multer.File[],
    @Body() body: MultipleFileDto,
  ) {
    return { ...body };
  }

  @Public()
  @Get('s3')
  async getFile() {
    const client = new S3Client({
      credentials: {
        secretAccessKey: 'OhIJ3QZkvzeJsGVpRDebJ6AGtBcXAZU4pJCY8p1I',
        accessKeyId: 'HUs0DJNaMaYSdQTiPShy',
      },
      region: 'auto',
      endpoint: 'http://localhost:9000',
    });
    const command = new GetObjectCommand({
      Bucket: 'test',
      Key: 'test/test.zip',
    });
    try {
      const response = await client.send(command);
      // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
      const str = await response.Body.transformToByteArray();
      fs.writeFile('xxx.zip', str, () => {
        console.log('fhsfjksfjkskfs');
      });
      console.log(str);
    } catch (err) {
      console.error(err);
    }
  }
}
