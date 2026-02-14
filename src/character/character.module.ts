import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { CharacterRepository } from './character.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterRepository],
  exports: [CharacterRepository],
})
export class CharacterModule {}
