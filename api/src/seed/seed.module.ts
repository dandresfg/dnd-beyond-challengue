import { Module } from '@nestjs/common';
import { CharacterModule } from '../character/character.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CharacterModule],
  providers: [SeedService],
})
export class SeedModule {}
