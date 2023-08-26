import { Injectable } from '@nestjs/common';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class UserRegistrationTokenService {
  constructor(private readonly userProfileService: UserProfileService) {}

  async findOne(uuid: string) {
    const user = await this.userProfileService.findOne(uuid);
    if (!user) {
      throw Error(`there is no user with this uuid ${uuid}`);
    }
    const registrationToken = user['registrationToken'];
    return { registrationToken, uuid };
  }

  async upsert(uuid: string, registrationToken: string) {
    const user = this.userProfileService.findOne(uuid);
    if (!user) {
      throw Error(`there is no user with this uuid ${uuid}`);
    }
    const upserted = await this.userProfileService.update(uuid, {
      registrationToken,
    });

    return {
      registrationToken: upserted['registrationToken'],
      uuid,
    };
  }
}
