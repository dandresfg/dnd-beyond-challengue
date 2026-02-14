import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string; character: string } {
    return {
      message: 'D&D HP Management API v1.0',
      character: 'Briv',
    };
  }
}
