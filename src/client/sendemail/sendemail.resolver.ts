import { Args, Query, Resolver } from '@nestjs/graphql';
import { SendemailService } from './sendemail.service';

@Resolver()
export class SendemailResolver {
  constructor(private readonly sendemailService: SendemailService) {}

  @Query(() => Boolean)
  async sendEmail(
    @Args('subject') subject: string,
    @Args('content') content: string,
    @Args('mobileNumber') mobileNumber: string,
  ) {
    try {
      await this.sendemailService.sendEmail(mobileNumber, subject, content);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
