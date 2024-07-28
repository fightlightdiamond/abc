import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Photo } from '../../photo/entities/photo.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];
}
