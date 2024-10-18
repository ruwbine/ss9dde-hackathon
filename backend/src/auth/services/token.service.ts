import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }

  extractTokenFromHeader(headers: Record<string, any>): string | null {
    const authHeader = headers['authorization'];
    return authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  }
}
