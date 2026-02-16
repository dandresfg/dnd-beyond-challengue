import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbType = this.configService.get<string>('DB_TYPE', 'sqlite');

    const commonOptions = {
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // Auto-create tables (for development)
      logging: false,
    };

    if (dbType === 'mysql') {
      return {
        ...commonOptions,
        type: 'mysql',
        host: this.configService.get<string>('DB_HOST', 'localhost'),
        port: this.configService.get<number>('DB_PORT', 3306),
        username: this.configService.get<string>('DB_USER', 'root'),
        password: this.configService.get<string>('DB_PASS', 'password'),
        database: this.configService.get<string>('DB_NAME', 'dnd_challenge'),
      };
    }

    // Default to SQLite (zero-config setup)
    return {
      ...commonOptions,
      type: 'sqlite',
      database: 'dnd_challenge.sqlite',
    };
  }
}
