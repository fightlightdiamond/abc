import { User } from '../../user/entities/user.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Photo } from '../../photo/entities/photo.entity';
import { Post } from '../../post/entities/post.entity';
import { Question } from '../../question/entities/question.entity';

export const entities = [User, Profile, Photo, Post, Question];

export { User, Profile, Photo, Post, Question };
