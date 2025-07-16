import { courses, training_periods, students, users } from "@prisma/client";

export interface StudentType extends users {
  student: students & {
    courses: courses & {
      training_periods: training_periods;
    };
  };
}
