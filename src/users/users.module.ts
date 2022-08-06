import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { PostsModule } from "src/posts/posts.module";
import { Role } from "src/roles/roles.model";
import { RolesModule } from "src/roles/roles.module";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";



@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), forwardRef(() => RolesModule), forwardRef(() => AuthModule), forwardRef(() => PostsModule)],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})

export class UsersModule {}