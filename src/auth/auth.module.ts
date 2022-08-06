import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule),
    JwtModule.register({
    secret: `${process.env.JWT_SECRET}`,
    signOptions: { expiresIn: '24h' },
  }),],
  exports: [JwtModule]
})
export class AuthModule {}
