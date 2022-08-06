import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.model';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { PostsModule } from './posts/posts.module';
import { PostModel } from './posts/posts.model';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
  }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, PostModel],
      synchronize: true,
    }),  
    UsersModule, AuthModule, RolesModule, PostsModule, FilesModule,
  ],
  providers: [FilesService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
