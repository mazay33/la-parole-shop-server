import { Role, User } from "@prisma/client";

export default class UserDto {
  email: string;
  id: number;
  role: Role;
  isActivated: boolean;
  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.role = model.role;
    this.isActivated = model.isActivated;
  }
}
