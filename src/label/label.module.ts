import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';

@Module({
  providers: [LabelResolver, LabelService]
})
export class LabelModule {}
