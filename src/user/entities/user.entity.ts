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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
