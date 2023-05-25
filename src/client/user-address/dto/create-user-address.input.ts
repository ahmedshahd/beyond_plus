import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAddressInput {
  longitude?: number | null;
  latitude?: number | null;
  city: string;
  area: string;
  buildingNumber: string;
  floorNumber: string;
  streetName: string;
  description?: string | null;
  userProfileUuid: string;
}
