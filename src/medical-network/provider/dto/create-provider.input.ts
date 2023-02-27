export class CreateProviderInput {
  name: string;
  address: string;
  longitude?: number;
  latitude?: number;
  phoneNumber: string[];
  email?: string;
  fax?: string;
  isOnline?: boolean;
  hasChronicMedication?: boolean;
  websiteUrl?: string;
  areaId: number;
  categoryId: number;
  specialityId: number;
  subSpecialityId?: number;
}
