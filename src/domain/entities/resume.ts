import { User } from "./user";

export interface Resume {
    fileName: string;
  
    fileUrl: string;
  
    userId: string | User;
  
    jobDescription: string;
}
