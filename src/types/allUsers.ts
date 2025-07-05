import { users, students, subjects } from "@prisma/client";

export interface AllUsersType extends users {
  student?: students | null;
  subjects?: subjects[];
}
