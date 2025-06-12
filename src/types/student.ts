export interface StudentType {
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
  student: {
    serialNumber: string;
    trainingPeriod: number;
    trainingYear: number;
    rank: string;
    afos: string;
    course: string | null;
    remarks: string;
    userId: string;
  };
}
