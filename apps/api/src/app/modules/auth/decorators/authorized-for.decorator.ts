import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@cbp-one-fake/api-interfaces';

import { ROLE_KEY } from '../constants/role-key';

export function AuthorizedFor(roles: RoleType[]) {
  return SetMetadata(ROLE_KEY, roles);
}
