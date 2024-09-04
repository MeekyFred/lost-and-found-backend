import { SetMetadata } from '@nestjs/common';

import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthType } from '../enums/auth-type.enum';

/**
 * Decorator for setting the auth type
 * @param authTypes The auth types
 */
export const Auth = (...authTypes: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, authTypes); // prettier-ignore
