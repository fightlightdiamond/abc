import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { Public } from 'src/auth/auth.decorator';

@ApiTags('Hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }

  @Public()
  @Patch('/file')
  @ApiOperation({ summary: 'Uploads a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateHeroDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  singleFile(@Body() body: CreateHeroDto, @UploadedFile() file: File) {
    console.log('============', body);
    return 123;
  }

  @Patch('/files')
  @ApiOperation({ summary: 'Uploads multiple files' })
  @ApiConsumes('multipart/form-data')
  multipleFiles() {
    return console.log('World');
  }
}
