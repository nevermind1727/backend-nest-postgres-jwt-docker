import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([User, Role]), AuthModule],
  exports: [RolesService]
})
export class RolesModule {}
