import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { PostModel } from './posts.model';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel, User]), FilesModule, forwardRef(() => UsersModule), AuthModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
