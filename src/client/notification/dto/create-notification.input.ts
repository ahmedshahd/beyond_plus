import { Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}
