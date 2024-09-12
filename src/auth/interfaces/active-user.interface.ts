import { UserRole } from 'src/users/enums/user-role.enum';

export interface IActiveUser {
  id: string; // User id
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
}
