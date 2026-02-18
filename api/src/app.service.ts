import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'D&D HP Management API v1.0',
      status: 'OK',
    };
  }
}
