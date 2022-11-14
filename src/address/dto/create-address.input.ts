import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

export class CreateAddressInput {
  @Field()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  userId: number;

  @Field()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  longitude: number;

  @Field()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  latitude: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  streetName: string;

  @Field()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  buildingNumber: number;

  @Field()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  floorNumber: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  details: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  region: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  area: string;
}
