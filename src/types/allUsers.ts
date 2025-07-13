import { users, students, subjects } from "@prisma/client";

export interface AllUsersType extends users {
  student?: students | null;
  subjects?: subjects[];
  training_periods?: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    weeks: number;
  };
}
