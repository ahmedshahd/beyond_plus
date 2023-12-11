export class CreateProviderInput {
  name: string;
  tierRank: number;

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
  insuranceCompanyId: number;
  specialityId: number;
  subSpecialityId?: number;
  providerTypeId: number;
}
