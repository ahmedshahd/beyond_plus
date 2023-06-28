import { Module } from '@nestjs/common';
import { SendemailService } from './sendemail.service';
import { SendemailResolver } from './sendemail.resolver';

@Module({
  providers: [SendemailResolver, SendemailService]
})
export class SendemailModule {}
