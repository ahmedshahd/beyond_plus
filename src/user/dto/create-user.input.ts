import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@ArgsType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  insuranceCompanyName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  mobile: string;
}
