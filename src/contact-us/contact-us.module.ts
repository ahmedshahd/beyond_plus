import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsResolver } from './contact-us.resolver';

@Module({
  providers: [ContactUsResolver, ContactUsService]
})
export class ContactUsModule {}
