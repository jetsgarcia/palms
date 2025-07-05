import { students, users } from "@prisma/client";

export interface StudentType extends users {
  student: students;
}
