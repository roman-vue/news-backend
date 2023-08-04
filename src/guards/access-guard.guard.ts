import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AccessGuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,  ){}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const auth = request.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('token undefined');
    }
    request.user = await jwt.verify(token, 'SECRET');
    Logger.debug(request.user.sub)
    if(request.user){
      return true
    }

    return false;
  }
}