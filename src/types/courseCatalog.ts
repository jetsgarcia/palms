export type CourseCatalogType = {
  code: string;
  level: string;
  name: string;
  trainingPeriodId: number;
  modules: {
    id: number;
    name: string;
    number: number;
    afosCode: string;
    subjects: {
      code: string;
      name: string;
      instructorId: string;
      moduleId: number;
      users?: {
        id: string;
        firstName: string;
        lastName: string;
        middleInitial?: string;
        suffix?: string;
        email: string;
      };
    }[];
  }[];
};
