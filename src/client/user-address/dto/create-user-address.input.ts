import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAddressInput {
  longitude?: number | null;
  latitude?: number | null;
  name: string;
  clientCityId: number;
  clientAreaId: number;
  buildingNumber: string;
  floorNumber: string;
  streetName: string;
  description?: string | null;
  userProfileUuid: string;
}
