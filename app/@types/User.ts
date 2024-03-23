import { Role } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface UserPayloadData extends JwtPayload {
  email: string;
  id: number;
  role: Role;
  isActivated: boolean;
}
