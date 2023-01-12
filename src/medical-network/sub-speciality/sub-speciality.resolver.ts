import { Resolver } from '@nestjs/graphql';
import { SubSpecialityService } from './sub-speciality.service';

@Resolver('SubSpeciality')
export class SubSpecialityResolver {
  constructor(private readonly subSpecialityService: SubSpecialityService) {}
}
