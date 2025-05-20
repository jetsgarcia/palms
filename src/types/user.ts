export interface User {
  id: string;
  lastName: string;
  firstName: string;
  middleInitial: string | null;
  suffix: string | null;
  email: string;
  password: string;
  role: "ADMIN" | "STUDENT" | "INSTRUCTOR";
  firstLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
