import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { CharacterModule } from '../character/character.module';

@Module({
  imports: [CharacterModule],
  providers: [InitService],
})
export class InitModule {}
