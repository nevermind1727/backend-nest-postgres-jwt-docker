import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
          return true;
        }
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization
        const bearer = authHeader.split(" ")[0]
        const token = authHeader.split(" ")[1]
        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException({message: "User isn't authorized"})
        }
        const user = this.jwtService.verify(token)
        req.user = user
        return req.user.roles.some(role => requiredRoles.includes(role.value))
    } catch (e) {
        console.log(e)
        throw new HttpException("No access", HttpStatus.FORBIDDEN)
    }
  }
}