import { Module } from '@nestjs/common';
import { LearnIconService } from './learn-icon.service';
import { LearnIconResolver } from './learn-icon.resolver';

@Module({
  providers: [LearnIconResolver, LearnIconService]
})
export class LearnIconModule {}
