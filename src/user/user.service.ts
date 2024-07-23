import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Photo } from '../photo/entities/photo.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const profile = new Profile();
    profile.gender = 'male';
    profile.photo = 'me.jpg';
    await this.profileRepository.save(profile);

    const user = new User();
    user.name = 'Joe Smith';
    user.profile = profile;
    await this.usersRepository.save(user);

    const photo1 = new Photo();
    photo1.url = 'me.jpg';
    photo1.user = user;

    const photo2 = new Photo();
    photo2.url = 'me-and-bears.jpg';
    photo2.user = user;

    await this.photoRepository.save([photo1, photo2]);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: {
        profile: true,
        photos: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  dummy(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
