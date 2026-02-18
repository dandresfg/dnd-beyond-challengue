import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterController } from './character.controller';
import { Character } from './character.entity';
import { CharacterRepository } from './character.repository';
import { CharacterService } from './character.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharacterController],
  providers: [CharacterRepository, CharacterService],
  exports: [CharacterRepository],
})
export class CharacterModule {}
