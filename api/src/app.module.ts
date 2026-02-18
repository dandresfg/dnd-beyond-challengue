import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/database.config';
import { CharacterModule } from './character/character.module';
import { SeedModule } from './seed/seed.module';
import { CombatLogModule } from './combat-log/combat-log.module';
import { CharacterEventsHandler } from './events/character-events.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    EventEmitterModule.forRoot(),
    CharacterModule,
    CombatLogModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService, CharacterEventsHandler],
})
export class AppModule {}
