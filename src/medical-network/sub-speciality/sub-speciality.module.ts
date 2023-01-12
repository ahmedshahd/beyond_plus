import { Module } from '@nestjs/common';
import { SubSpecialityService } from './sub-speciality.service';
import { SubSpecialityResolver } from './sub-speciality.resolver';

@Module({
  providers: [SubSpecialityResolver, SubSpecialityService]
})
export class SubSpecialityModule {}
