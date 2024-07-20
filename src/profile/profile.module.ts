import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../_map/entites';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
