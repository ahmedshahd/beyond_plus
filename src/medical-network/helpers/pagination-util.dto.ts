import { IsInt, IsOptional, IsString } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@ArgsType()
export class PaginationAndSearchArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number;

  @Field()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
